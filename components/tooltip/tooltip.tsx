import React, { FC, useState, useRef, MutableRefObject, useLayoutEffect } from 'react'
import classnames from 'classnames'
import { useEffectTimeout } from '../_hooks'
import { tooltipProps } from './types'
import { getTooltipPositionStyle } from './util'
import './tooltip.less'

const Tooltip: FC<tooltipProps> = ({ title, target, visible, position = 'topCenter', trigger, setVisible }) => {
    const [classname, setClassname] = useState(visible ? 'show' : 'hidden')
    const [show, setShow] = useState(!!visible)
    const [topLeftstyle, setTopLeftstyle] = useState({})
    const tooltipRef: MutableRefObject<null | HTMLDivElement> = useRef(null)
    const baseStyle = { display: show ? 'block' : 'none' }

    const onMouseEnter = () => {
        if (trigger === 'hover') {
            setVisible(true)
        }
    }

    const onMouseLeave = () => {
        if (trigger === 'hover') {
            setVisible(false)
        }
    }

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

    useLayoutEffect(() => {
        if (show) {
            const style = getTooltipPositionStyle(position, target, tooltipRef.current)
            setTopLeftstyle(style)
        }
    }, [position, target, tooltipRef, show])

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            ref={tooltipRef}
            className={classnames('uik-tooltip', position)}
            style={{ ...baseStyle, ...topLeftstyle }}
        >
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
