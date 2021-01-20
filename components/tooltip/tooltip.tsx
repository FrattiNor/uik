import React, { FC, useState, CSSProperties } from 'react'
import classnames from 'classnames'
import { useEffectTimeout } from '../_hooks'
import { tooltipProps, tooltipPoint, tooltipPosition } from './types'
import './tooltip.less'

const getTooltipStyle = (point: tooltipPoint, position: tooltipPosition, show: boolean): CSSProperties => {
    const { x, y, width, height } = point
    const baseStyle = { display: show ? 'block' : 'none' }
    const juli = 7

    switch (position) {
        case 'topLeft':
            return {
                top: y - juli,
                left: x,
                ...baseStyle
            }
        case 'topCenter':
            return {
                top: y - juli,
                left: x + width / 2,
                ...baseStyle
            }
        case 'topRight':
            return {
                top: y - juli,
                left: x + width,
                ...baseStyle
            }
        case 'bottomLeft':
            return {
                top: y + height + juli,
                left: x,
                ...baseStyle
            }
        case 'bottomCenter':
            return {
                top: y + height + juli,
                left: x + width / 2,
                ...baseStyle
            }
        case 'bottomRight':
            return {
                top: y + height + juli,
                left: x + width,
                ...baseStyle
            }
        case 'leftTop':
            return {
                top: y,
                left: x - juli,
                ...baseStyle
            }
        case 'leftCenter':
            return {
                top: y + height / 2,
                left: x - juli,
                ...baseStyle
            }
        case 'leftBottom':
            return {
                top: y + height,
                left: x - juli,
                ...baseStyle
            }
        case 'rightTop':
            return {
                top: y,
                left: x + width + juli,
                ...baseStyle
            }
        case 'rightCenter':
            return {
                top: y + height / 2,
                left: x + width + juli,
                ...baseStyle
            }
        case 'rightBottom':
            return {
                top: y + height,
                left: x + width + juli,
                ...baseStyle
            }
        default:
            return baseStyle
    }
}

const Tooltip: FC<tooltipProps> = ({ title, point, visible, position = 'rightBottom' }) => {
    const [classname, setClassname] = useState(visible ? 'show' : 'hidden')
    const [show, setShow] = useState(!!visible)

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

    return (
        <div className={classnames('uik-tooltip', classname, position)} style={getTooltipStyle(point, position, show)}>
            <div className="uik-tooltip-arrow">
                <div className="uik-tooltip-arrow-content" />
            </div>
            <div className="uik-tooltip-inner">{title}</div>
        </div>
    )
}

export default Tooltip
