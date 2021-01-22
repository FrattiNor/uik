import React, { FC, Fragment, useEffect, useState, useMemo, isValidElement, useRef, cloneElement, MutableRefObject } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { noticeRenderProps, noticeRenderHocProps } from './types'
import { getContainer } from '../../_utils'
import { useDebounce, useEffectOnce } from '../../_hooks'

const noticeRenderHoc = ({ Component, name }: noticeRenderHocProps): FC<noticeRenderProps> =>  {

    // 获取容器 notice 容器
    const getNoticeContainer = (containerZIndex?: number, rootId?: string): HTMLElement => {
        const zIndex = containerZIndex || 1001

        const container = getContainer({
            id: `uik-${name}-${zIndex}`,
            containerType: 'absolute',
            zIndex, // modal 1000, tooltip 1001, confirm 1001 ,message 1002
            rootId
        })

        return container
    }

    // notice render 组件
    const NoticeRender: FC<noticeRenderProps> = ({ children, visible: outVisible, containerZIndex, trigger = 'hover', ...restProps }) => {
        const { rootId } = restProps
        // target
        const targetRef: MutableRefObject<HTMLElement | null> = useRef(null)
        // 虚拟visible
        const [virtualVisible, setVirtualVisible] = useState(false)
        // 实际的visible在有传visible时用visible
        const visible = typeof outVisible === 'boolean' ? outVisible : virtualVisible
        // 挂载的div
        const [div, setDiv]: [HTMLDivElement | null, any] = useState(null)
        // 防抖设置Visible
        const debounceSetVisible = useDebounce(setVirtualVisible, 200)
        // DOM
        const DOM = useMemo(
            () => <Component {...restProps} visible={visible} target={targetRef.current} trigger={trigger} setVisible={debounceSetVisible} />,
            [restProps, visible, targetRef, trigger, debounceSetVisible]
        )

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
                                    debounceSetVisible(!virtualVisible)
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

        // 只创建一次div
        useEffectOnce(
            visible,
            () => {
                if (visible) {
                    const container = getNoticeContainer(containerZIndex, rootId)
                    const div = document.createElement('div')
                    div.setAttribute
                    container.append(div)
                    setDiv(div)
                }
            },
            [visible, containerZIndex, rootId]
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
