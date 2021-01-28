import React, { FC, Fragment, useEffect, useState, useMemo, isValidElement, useRef, cloneElement, MouseEvent } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { noticeRenderProps, noticeRenderHocComponent } from './types'
import { getContainer, getRootById, getDefaultRoot } from '../../_utils'
import { useDebounce, useEffectAfterFirst, useEffectOnce, useStateFromValue } from '../../_hooks'

// 获取参数
const noticeRenderHoc: noticeRenderHocComponent = ({ Component, name, defaultTrigger }) => {
    // 获取容器 notice 容器
    const getNoticeContainer = (containerZIndex: number, root: HTMLElement): HTMLElement => {
        // root 为根目录时才有id
        const id = root === getDefaultRoot() ? `uik-${name}-${containerZIndex}` : undefined

        const container = getContainer({
            id,
            root,
            containerType: 'absolute',
            zIndex: containerZIndex // modal 1000, notice 1001, confirm 1001 ,message 1002
        })

        return container
    }

    // notice render 组件
    const NoticeRender: FC<noticeRenderProps> = (props) => {
        const {
            children,
            visible: outVisible,
            containerZIndex = 1001,
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
        // target
        const targetRef = useRef<HTMLElement>(null)
        // 虚拟visible，和外部的visible保持一致（避免出现2个visible不一致的情况，保证onVisibleChange传的visible没问题）
        const [virtualVisible, setVirtualVisible] = useStateFromValue(!!outVisible)
        // 实际的visible
        const visible = typeof outVisible === 'boolean' ? outVisible : virtualVisible
        // 防抖设置visible
        const debounceSetVisible = useDebounce((v: boolean) => {
            if (!disabled) setVirtualVisible(v)
        }, 200)

        // DOM
        const DOM = useMemo(() => {
            return (
                <Component
                    {...restProps}
                    setVirtualVisible={debounceSetVisible}
                    visible={visible}
                    trigger={trigger}
                    target={targetRef.current}
                    container={container}
                    root={root}
                />
            )
        }, [restProps, visible, trigger, debounceSetVisible, container, root])

        // 获取child
        const getChild = () => {
            if (children !== null) {
                const firstElement = Array.isArray(children) ? children[0] : children
                const element = isValidElement(firstElement) ? firstElement : <span>{firstElement}</span>

                const childFun = () => {
                    switch (trigger) {
                        case 'hover':
                            return {
                                onMouseEnter: (e: MouseEvent) => {
                                    const { onMouseEnter } = element.props
                                    if (onMouseEnter) onMouseEnter(e)
                                    debounceSetVisible(true)
                                },
                                onMouseLeave: (e: MouseEvent) => {
                                    const { onMouseLeave } = element.props
                                    if (onMouseLeave) onMouseLeave(e)
                                    debounceSetVisible(false)
                                }
                            }
                        case 'focus':
                            return {
                                onFocus: (e: MouseEvent) => {
                                    const { onFocus } = element.props
                                    if (onFocus) onFocus(e)
                                    debounceSetVisible(true)
                                },
                                onBulr: (e: MouseEvent) => {
                                    const { onBulr } = element.props
                                    if (onBulr) onBulr(e)
                                    debounceSetVisible(false)
                                }
                            }
                        case 'click':
                            return {
                                onClick: (e: MouseEvent) => {
                                    const { onClick } = element.props
                                    if (onClick) onClick(e)
                                    debounceSetVisible(!visible)
                                }
                            }
                        default:
                            return {}
                    }
                }

                const cloneE = cloneElement(element, { ref: targetRef, ...childFun() })

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

        // 只创建一次div
        useEffectOnce(
            visible,
            () => {
                if (visible) {
                    const root = getRoot ? getRoot() || getDefaultRoot() : getRootById(rootId)
                    const container = getNoticeContainer(containerZIndex, root)
                    const div = document.createElement('div')
                    div.setAttribute
                    container.append(div)

                    setRoot(root)
                    setContainer(container)
                    setDiv(div)
                }
            },
            [visible, containerZIndex, getRoot, rootId]
        )

        // 根据props更新dom
        useEffect(() => {
            if (div !== null) {
                ReactDOM.render(DOM, div)
            }
        }, [div, DOM])

        // 卸载时unmountComponentAtNode
        useEffect(() => {
            return () => {
                if (div !== null) {
                    unmountComponentAtNode(div)
                }
            }
        }, [div])

        return <Fragment>{getChild()}</Fragment>
    }

    return NoticeRender
}

export default noticeRenderHoc
