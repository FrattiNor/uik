import React, { FC, MouseEvent } from 'react'
import classnames from 'classnames'
import { monthSelectProps } from './types'
import './month-select.less'

const MonthSelect: FC<monthSelectProps> = (props) => {
    const { currentMonth, onClick: outOnClick } = props

    const monthList = Array(12)
        .fill('')
        .map((_, i) => 1 + i)

    const onClick = (e: MouseEvent<HTMLElement>, monthNumber: number) => {
        e.stopPropagation() // 取消冒泡事件，屏蔽掉全局点击事件【全局点击事件因为会切换page导致组件取消挂载，所以点击会触发visible变false】
        if (outOnClick) {
            outOnClick(monthNumber)
        }
    }

    return (
        <div className="uik-month-select">
            {monthList.map((monthNumber) => (
                <div
                    key={monthNumber}
                    className={classnames('month', { ['current-month']: monthNumber === currentMonth })}
                    onClick={(e) => onClick(e, monthNumber)}
                >
                    {monthNumber}月
                </div>
            ))}
        </div>
    )
}

export default MonthSelect
