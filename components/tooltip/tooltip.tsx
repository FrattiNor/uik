import React, { FC, useState, useRef, MutableRefObject, useEffect } from 'react'
import classnames from 'classnames'
import { useEffectTimeout } from '../_hooks'
import { tooltipProps } from './types'
import { getTooltipPositionStyle } from './util'
import './tooltip.less'
import { getRoot } from '../_utils'

const Tooltip: FC<tooltipProps> = ({ title, point, visible, position = 'topCenter', getRootContainer }) => {
    const [classname, setClassname] = useState(visible ? 'show' : 'hidden')
    const [show, setShow] = useState(!!visible)
    const tooltipRef: MutableRefObject<null | HTMLDivElement> = useRef(null)
    const [clientHeight, setHeigt] = useState(0)
    const [clientWidth, setWidth] = useState(0)
    const [topLeftstyle, setTopLeftstyle] = useState({})
    const baseStyle = { display: show ? 'block' : 'none' }

    useEffectTimeout(
        (connect) => {
            if (visible) {
                setClassname('show')
                setShow(true)
            } else {
                setClassname('hidden')
                connect(
                    setTimeout(() => {
                        setShow(false)
                        setClassname('')
                    }, 200)
                )
            }
        },
        [visible]
    )

    useEffect(() => {
        if (tooltipRef.current) {
            setHeigt(tooltipRef.current.clientHeight)
            setWidth(tooltipRef.current.clientWidth)
        }
    }, [])

    useEffect(() => {
        const root = getRoot(getRootContainer)
        const style = getTooltipPositionStyle(point, position, { clientHeight, clientWidth }, root)
        const resStyle = style
        // let top = style.top
        // let left = style.left

        // if (autoAdjust) {
        //     const rootWidth = root.clientWidth
        //     const rootHeight = root.clientHeight
        //     const minTop = 0
        //     const maxTop = rootHeight - clientHeight
        //     const minLeft = 0
        //     const maxLeft = rootWidth - clientWidth

        //     console.log(top, left)

        //     // while (top >= minTop && top <= maxTop && left >= minLeft && left <= maxLeft) {
        //     //     let newPosition = position
        //     //
        //     //     if (top < minTop) {
        //     //         newPosition = position.replace(/(top|Top)/, 'bottom') as tooltipPosition
        //     //     }
        //     //     if (top > maxTop) {
        //     //         newPosition = position.replace(/(bottom|Bottom)/, 'top') as tooltipPosition
        //     //     }
        //     //     if (left < minLeft) {
        //     //         newPosition = position.replace(/(left|Left)/, 'right') as tooltipPosition
        //     //     }
        //     //     if (left > maxLeft) {
        //     //         newPosition = position.replace(/(right|Right)/, 'left') as tooltipPosition
        //     //     }
        //     //     console.log('newPosition', newPosition)
        //     //     const newStyle = getTooltipPositionStyle(point, newPosition, { clientHeight, clientWidth }, root)
        //     //     top = newStyle.top
        //     //     left = newStyle.left
        //     // }

        //     resStyle = { top, left }
        // } else {
        //     resStyle = { top, left }
        // }

        setTopLeftstyle(resStyle)
    }, [position, point, clientHeight, clientWidth, getRootContainer])

    return (
        <div ref={tooltipRef} className={classnames('uik-tooltip', position)} style={{ ...baseStyle, ...topLeftstyle }}>
            <div className={classname}>
                <div className="uik-tooltip-arrow">
                    <div className="uik-tooltip-arrow-content" />
                </div>
                <div className="uik-tooltip-inner">{title}</div>
            </div>
        </div>
    )
}

export default Tooltip
