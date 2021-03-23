import React, { FC } from 'react'
import { timeSelectProps } from './types'
import './time-select.less'


const TimeSelect: FC<timeSelectProps> = () => {
    
    const mapNumber = (n: number) =>
        Array(n)
            .fill('')
            .map((_, i) => <div key={i} className="uik-time-select-item">{i}</div>)

    return (
        <div className="uik-time-select">
            <div className="uik-time-select-hour">{mapNumber(24)}</div>
            <div className="uik-time-select-minute">{mapNumber(60)}</div>
            <div className="uik-time-select-second">{mapNumber(60)}</div>
        </div>
    )
}

export default TimeSelect
