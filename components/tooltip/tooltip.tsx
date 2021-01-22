import React, { FC, useState, useRef, MutableRefObject, useEffect } from 'react'
import classnames from 'classnames'
import { useEffectTimeout, useStateFromValue } from '../_hooks'
import { tooltipProps } from './types'
import { getTooltipPositionStyle, autoAdjustPosition } from './util'
import './tooltip.less'

const Tooltip: FC<tooltipProps> = ({ title, target, visible, position: outPosition = 'topCenter', trigger, setVisible, autoAdjust, rootId }) => {
    const [count, setCount] = useState(0)
    const [position, setPosition] = useStateFromValue(outPosition)
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

    useEffect(() => {
        if (show) {
            const { top, left, error } = getTooltipPositionStyle(position, target, tooltipRef.current, rootId)

            // 限制调整次数
            if (autoAdjust && error && count < 5) {
                setCount(count + 1)
                const newPosition = autoAdjustPosition(position, error)
                if(newPosition) {
                    setPosition(newPosition)
                }
            } else {
                setTopLeftstyle({ top, left })
            }
        }
    }, [position, target, tooltipRef, show, autoAdjust, rootId])

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
