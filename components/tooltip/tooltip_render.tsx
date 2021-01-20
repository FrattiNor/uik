import React, { FC, Fragment, useEffect, useState, useMemo, isValidElement, useRef, cloneElement, MutableRefObject } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { tooltipRenderProps } from './types'
import { getContainer } from '../_utils'
import Tooltip from './tooltip'

// 获取容器 tooltip 容器
const getTooltipContainer = (containerZIndex?: number): HTMLElement => {
    const zIndex = containerZIndex || 1001

    const container = getContainer({
        id: `uik-tooltip-${zIndex}`,
        containerType: 'absolute',
        zIndex // modal 1000, tooltip 1001 ,message 1002
    })

    return container
}

// tooltip render 组件
const TooltipRender: FC<tooltipRenderProps> = ({ children, visible: outVisible, containerZIndex, ...restProps }) => {
    const componentRef: MutableRefObject<HTMLElement | null> = useRef(null)
    const [componentVisible, setComponentVisible] = useState(false)
    const visible = typeof outVisible === 'boolean' ? outVisible : componentVisible // 实际的visible在有传visible时用visible
    const [render, setRender] = useState(false)
    const [div, setDiv]: [HTMLDivElement | null, any] = useState(null)
    const [position, setPosition] = useState({ x: -1, y: -1, width: -1, height: -1 })
    const DOM = useMemo(() => <Tooltip {...restProps} visible={visible} position={position} />, [restProps, visible, position])

    // 获取child
    const getChild = () => {
        if (children !== null) {
            const firstElement = Array.isArray(children) ? children[0] : children
            const element = isValidElement(firstElement) ? firstElement : <span>{firstElement}</span>

            const cloneE = cloneElement(element, {
                ref: componentRef,
                onMouseOver: (e: MouseEvent) => {
                    const { onMouseOver } = element.props
                    if (onMouseOver) onMouseOver(e)
                    setComponentVisible(true)
                },
                onMouseOut: (e: MouseEvent) => {
                    const { onMouseOut } = element.props
                    if (onMouseOut) onMouseOut(e)
                    setTimeout(() => {
                        setComponentVisible(false)
                    }, 200)
                }
            })

            return cloneE
        }
        return null
    }

    // 只创建一次div
    useEffect(() => {
        if (visible && !render) {
            const container = getTooltipContainer(containerZIndex)
            const div = document.createElement('div')
            div.setAttribute
            container.append(div)
            setDiv(div)
            setRender(true)
        }
    }, [visible])

    // 根据props更新Tooltip
    useEffect(() => {
        if (div !== null) {
            ReactDOM.render(DOM, div)
        }
    }, [div, DOM])

    // 获取定位
    useEffect(() => {
        const target = componentRef.current
        if (target !== null && visible) {
            const { x, y, width, height } = target.getBoundingClientRect()
            setPosition({ x, y, width, height })
        }
    }, [componentRef, visible])

    // 卸载时unmountComponentAtNode，想把visible:false传入的话需要再ReactDOM.render一次，因为卸载后不会再执行useEffect了
    useEffect(() => {
        return () => {
            if (div !== null) {
                ReactDOM.render(<Tooltip {...restProps} visible={false} position={position} />, div)
                setTimeout(() => {
                    unmountComponentAtNode(div)
                }, 200)
            }
        }
    }, [div])

    return <Fragment>{getChild()}</Fragment>
}

export default TooltipRender
