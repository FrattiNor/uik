import React, { FC, SVGProps } from 'react'
import { progressProps } from './types'
import './progress.less'

const Progress: FC<progressProps> = (props) => {
    const { percent = 0, barWidth = 8, type = 'line', width } = props
    const truePercent = percent > 100 ? 100 : percent < 0 ? 0 : percent

    // line
    const getLine = () => {
        const progressStyle = {
            display: width ? 'inline-block' : 'block',
            width,
            height: barWidth,
            borderRadius: barWidth / 2
        }

        const precentStyle = {
            height: barWidth,
            borderRadius: barWidth / 2
        }
        return (
            <div className="uik-progress-line" style={progressStyle}>
                <div className="uik-progress-line-precent" style={{ ...precentStyle, width: `${truePercent}%` }} />
            </div>
        )
    }

    // circle
    const getCircle = () => {
        const trueWidth = width || 200 // 方块宽度
        const r = trueWidth / 2 - barWidth // 半径
        const roundline = 2 * Math.PI * r // 圆环周长
        const percentLine = (roundline / 100) * truePercent // 占据的百分比周长
        const sameCircleStyle = { cx: trueWidth / 2, cy: trueWidth / 2, r, fill: 'none', strokeWidth: barWidth }

        const circleProps: SVGProps<SVGCircleElement> = {
            strokeDasharray: `${percentLine} ${roundline}`,
            strokeLinecap: 'round',
            opacity: truePercent === 0 ? 0 : 1
        }

        return (
            <svg className="uik-progress-circle" height={trueWidth} width={trueWidth}>
                <circle {...sameCircleStyle} stroke="#f5f5f5" />
                <circle {...sameCircleStyle} stroke="#1890ff" {...circleProps} />
            </svg>
        )
    }

    switch (type) {
        case 'line':
            return getLine()
        case 'circle':
            return getCircle()
        default:
            return null
    }
}

export default Progress
