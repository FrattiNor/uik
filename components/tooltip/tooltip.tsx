import React, { FC, useState } from 'react'
import classnames from 'classnames'
import { useEffectTimeout } from '../_hooks'
import { tooltipProps } from './types'
import './tooltip.less'

const Tooltip: FC<tooltipProps> = ({ title, position, visible }) => {
    const { x, y, width } = position

    const [classname, setClassname] = useState(visible ? 'show' : 'hidden')
    const [show, setShow] = useState(visible)

    const tooltipStyle = {
        top: y - 8,
        left: x + width / 2,
        display: show ? 'block' : 'none'
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

    return (
        <div className={classnames('uik-tooltip', classname)} style={tooltipStyle}>
            <div className="uik-tooltip-arrow">
                <div className="uik-tooltip-arrow-content" />
            </div>
            <div className="uik-tooltip-inner">{title}</div>
        </div>
    )
}

export default Tooltip
