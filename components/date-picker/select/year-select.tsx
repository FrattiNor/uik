import React, { FC } from 'react'
import classnames from 'classnames'
import { yearSelectProps } from './types'
import './year-select.less'

const YearSelect: FC<yearSelectProps> = (props) => {
    const { currentYear, startYear, endYear, onClick } = props

    const yearList = Array(endYear - startYear + 1)
        .fill('')
        .map((_, i) => startYear + i)

    return (
        <div className="uik-year-select">
            {yearList.map((yearNumber) => (
                <div
                    key={yearNumber}
                    className={classnames('year', { ['current-year']: yearNumber === currentYear })}
                    onClick={(e) => {
                        e.stopPropagation() // 取消冒泡事件，屏蔽掉全局点击事件【全局点击事件因为会切换page导致组件取消挂载，所以点击会触发visible变false】
                        onClick && onClick(yearNumber)
                    }}
                >
                    {yearNumber}
                </div>
            ))}
        </div>
    )
}

export default YearSelect
