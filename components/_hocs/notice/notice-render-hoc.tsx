import React, { FC, Fragment, useEffect, useState, useMemo, isValidElement, useRef, cloneElement, MouseEvent } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { noticeRenderProps, noticeProps, noticeRenderHocProps, noticeRenderHocInner } from './types'
import { getContainer, getRootById, getDefaultRoot, getElementUUID } from '../../_utils'
import { useDebounce, useEffectAfterFirst, useEffectOnce, useStateFromValue } from '../../_hooks'

// 获取参数
function noticeRenderHoc<T>({ name, defaultTrigger, defaultZIndex }: noticeRenderHocProps): noticeRenderHocInner<T> {
    // inner
    const noticeRenderHocInner: noticeRenderHocInner<T> = (WrapperComponent) => {
        // 获取容器 notice 容器
        const getNoticeContainer = (root: HTMLElement, containerZIndex?: number): HTMLElement => {
            // root 为根目录时才有id
            const id = root === getDefaultRoot() ? `uik-${name}-${containerZIndex}` : `uik-${name}-${containerZIndex}-${getElementUUID(root)}`

            const container = getContainer({
                id,
                root,
                containerType: 'absolute',
                zIndex: containerZIndex || defaultZIndex // modal 1000, dropdown 1001, date-picker 1002, confirm 1003, tooltip 1004 ,message 1005
            })

            return container
        }

        // notice render 组件
        const NoticeRender: FC<noticeRenderProps & T> = (props) => {
            const {
                children,
                visible: outVisible,
                containerZIndex,
                trigger = defaultTrigger,
                disabled = false,
                onVisibleChange,
                rootId,
                getRoot,
                ...restProps
            } = props
            // 根（装容器）
            const [root, setRoot] = useState<HTMLElement | null>(null)
            // 挂载的容器 (装div)
            const [container, setContainer] = useState<HTMLElement | null>(null)
            // 挂载的div
            const [div, setDiv] = useState<HTMLElement | null>(null)
            // getChild
            const getChild = () => {
                const firstElement = Array.isArray(children) ? children[0] : children
                const element = isValidElement(firstElement) ? firstElement : <span>{firstElement}</span>
                return element
            }
            const child = getChild()
            // target ref
            const componentRef = useRef<HTMLElement>(null)
            const targetRef = (child as any).ref || componentRef
            // 虚拟visible，和外部的visible保持一致（避免出现2个visible不一致的情况，保证onVisibleChange传的visible没问题）
            const [virtualVisible, setVirtualVisible] = useStateFromValue(!!outVisible)
            // 实际的visible
            const visible = typeof outVisible === 'boolean' ? outVisible : virtualVisible
            // 防抖设置visible
            const debounceSetVisible = useDebounce((v: boolean) => {
                if (!disabled) setVirtualVisible(v)
            }, 100)

            // DOM
            const DOM = useMemo(() => {
                return (
                    <WrapperComponent
                        {...(restProps as T & noticeProps)}
                        setVirtualVisible={debounceSetVisible}
                        visible={visible}
                        trigger={trigger}
                        target={targetRef.current}
                        container={container}
                        root={root}
                    />
                )
            }, [restProps, visible, trigger, debounceSetVisible, container, root])

            // 获取child clone
            const getChildClone = () => {
                if (children !== null) {
                    const childFun = () => {
                        switch (trigger) {
                            case 'hover':
                                return {
                                    onMouseEnter: (e: MouseEvent) => {
                                        const { onMouseEnter } = child.props
                                        debounceSetVisible(true)
                                        if (onMouseEnter) onMouseEnter(e)
                                    },
                                    onMouseLeave: (e: MouseEvent) => {
                                        const { onMouseLeave } = child.props
                                        debounceSetVisible(false)
                                        if (onMouseLeave) onMouseLeave(e)
                                    }
                                }
                            case 'focus':
                                return {
                                    onFocus: (e: MouseEvent) => {
                                        const { onFocus } = child.props
                                        debounceSetVisible(true)
                                        if (onFocus) onFocus(e)
                                    },
                                    onBlur: (e: MouseEvent) => {
                                        const { onBlur } = child.props
                                        debounceSetVisible(false)
                                        if (onBlur) onBlur(e)
                                    }
                                }
                            case 'click':
                                return {
                                    onClick: (e: MouseEvent) => {
                                        const { onClick } = child.props
                                        debounceSetVisible(!visible)
                                        if (onClick) onClick(e)
                                    }
                                }
                            default:
                                return {}
                        }
                    }

                    const cloneE = cloneElement(child, { ref: targetRef, ...childFun() })

                    return cloneE
                }
                return null
            }

            // 当 visible 改变触发
            useEffectAfterFirst(() => {
                if (onVisibleChange) {
                    // 内部虚拟的visible触发改变时触发
                    onVisibleChange(virtualVisible)
                }
            }, [virtualVisible])

            // 只创建一次挂载点（div）
            useEffectOnce(
                visible,
                () => {
                    const root = getRoot ? getRoot() || getDefaultRoot() : getRootById(rootId)
                    const container = getNoticeContainer(root, containerZIndex)
                    const div = document.createElement('div')
                    div.setAttribute
                    container.append(div)

                    setRoot(root)
                    setContainer(container)
                    setDiv(div)
                },
                [visible]
            )

            // 根据props更新dom
            useEffect(() => {
                if (div !== null) {
                    ReactDOM.render(DOM, div)
                }
            }, [div, DOM])

            // 挂载点发生改变，取消挂载
            useEffect(() => {
                return () => {
                    if (div !== null) {
                        unmountComponentAtNode(div)
                        if (container !== null) {
                            container.removeChild(div)
                        }
                    }
                }
            }, [div])

            return <Fragment>{getChildClone()}</Fragment>
        }

        return NoticeRender
    }

    return noticeRenderHocInner
}

export default noticeRenderHoc
