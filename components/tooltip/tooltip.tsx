import React, { FC, useState, useRef, MutableRefObject, useEffect } from 'react'
import classnames from 'classnames'
import { useEffectTimeout } from '../_hooks'
import { tooltipProps } from './types'
import { getTooltipPositionStyle } from './util'
import './tooltip.less'

const Tooltip: FC<tooltipProps> = ({ title, point, visible, position = 'topCenter', autoAdjust, getRootContainer }) => {
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
        let resStyle = {}
        const { top, left } = getTooltipPositionStyle(point, position, { clientHeight, clientWidth }, getRootContainer)

        if(typeof top === 'number' && typeof left === 'number') {
            if(top > 0 && left > 0) {
                resStyle = { top, left }
            }
        }

        setTopLeftstyle(resStyle)
    }, [position, point, clientHeight, clientWidth, getRootContainer, autoAdjust])

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
