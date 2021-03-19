import React, { FC, useState, MouseEvent } from 'react'
import dayjs from 'dayjs'
import Icon from '../../icon'
import { useEffectAfterFirst } from '../../_hooks'
import DateSelect from '../select/date-select'
import YearSelect from '../select/year-select'
import MonthSelect from '../select/month-select'
import { monthNumber } from '../select/types'
import { datePickerDropdownProps } from './types'
import DropdownBox from '../dropdown-box'
import './date-picker-dropdown.less'

const DatePickerDropdown: FC<datePickerDropdownProps> = (props) => {
    // 使用 setVirtualVisible 关闭， 外部使用 onVisibleChange 监听
    const { selectedDay, dateClick, disabledDate, ...restProps } = props

    // 保持 显示的 month year 的 dayjs对象
    const [monthAndYear, setMonthAndYear] = useState(dayjs())

    const year = monthAndYear.year()
    const month = (monthAndYear.month() + 1) as monthNumber

    // 页面显示的 对应 date-日期选择 month-月份选择 year-年份选择
    const [page, setPage] = useState('date')
    // 年份选择 的 title 显示的年份 间距
    const [startYear, setStartYear] = useState(Math.floor(year / 10) * 10 - 1)
    const [endYear, setEndYear] = useState(Math.floor(year / 10) * 10 + 10)

    // title 的 单箭头 next 月份
    const nextMonth = () => {
        setMonthAndYear(monthAndYear.month(monthAndYear.month() + 1))
    }
    // title 的 单箭头 prev 月份
    const prevMonth = () => {
        setMonthAndYear(monthAndYear.month(monthAndYear.month() - 1))
    }
    // title 的 双箭头 next 年份，在年份选择页面则是切换年份间距
    const nextYear = () => {
        if (page === 'year') {
            setStartYear(endYear - 1)
            setEndYear(endYear + 10)
        } else {
            setMonthAndYear(monthAndYear.year(monthAndYear.year() + 1))
        }
    }
    // title 的 双箭头 prev 年份，在年份选择页面则是切换年份间距
    const prevYear = () => {
        if (page === 'year') {
            setStartYear(startYear - 10)
            setEndYear(startYear + 1)
        } else {
            setMonthAndYear(monthAndYear.year(monthAndYear.year() - 1))
        }
    }

    // 月份选择页面的点击事件
    const monthClick = (monthNumber: number) => {
        setMonthAndYear(monthAndYear.month(monthNumber - 1))
        setPage('date')
    }

    // 年份选择页面的点击事件
    const yearClick = (yearNumber: number) => {
        setMonthAndYear(monthAndYear.year(yearNumber))
        setPage('date')
    }
    // 标题的年份点击事件
    const titleYearClick = (e: MouseEvent<HTMLSpanElement>) => {
        // e.stopPropagation() 取消默认事件，屏蔽掉全局点击事件【全局点击事件因为会切换page导致组件取消挂载，所以点击会触发visible变false】
        e.stopPropagation()
        setStartYear(Math.floor(year / 10) * 10 - 1)
        setEndYear(Math.floor(year / 10) * 10 + 10)
        setPage('year')
    }
    // 标题的月份的点击事件
    const titleMonthClick = (e: MouseEvent<HTMLSpanElement>) => {
        // e.stopPropagation() 取消默认事件，屏蔽掉全局点击事件【全局点击事件因为会切换page导致组件取消挂载，所以点击会触发visible变false】
        e.stopPropagation()
        setPage('month')
    }

    useEffectAfterFirst(() => {
        if (selectedDay) {
            setMonthAndYear(selectedDay)
        }
    }, [selectedDay])

    const centerDom = (
        <>
            <div className="uik-date-picker-title">
                <span>
                    <Icon className="uik-date-picker-title-icon" onClick={prevYear} defaultIcon name="double-arrow-left" />
                    {page === 'date' && <Icon className="uik-date-picker-title-icon" onClick={prevMonth} defaultIcon name="arrow-left" />}
                </span>
                <span>
                    {page === 'date' && (
                        <>
                            <span onClick={titleYearClick} className="uik-date-picker-title-text click">
                                {year}年
                            </span>{' '}
                            <span onClick={titleMonthClick} className="uik-date-picker-title-text click">
                                {month}月
                            </span>
                        </>
                    )}
                    {page === 'month' && <span className="uik-date-picker-title-text">{year}年</span>}
                    {page === 'year' && (
                        <span className="uik-date-picker-title-text">
                            {startYear} - {endYear}
                        </span>
                    )}
                </span>
                <span>
                    {page === 'date' && <Icon className="uik-date-picker-title-icon" onClick={nextMonth} defaultIcon name="arrow-right" />}
                    <Icon className="uik-date-picker-title-icon" onClick={nextYear} defaultIcon name="double-arrow-right" />
                </span>
            </div>
            <div className="uik-date-picker-content">
                {page === 'date' && (
                    <DateSelect
                        disabledDate={disabledDate}
                        year={year}
                        month={month}
                        selectedDays={selectedDay ? [selectedDay] : []}
                        onClick={dateClick}
                    />
                )}
                {page === 'month' && <MonthSelect currentMonth={month} onClick={monthClick} />}
                {page === 'year' && <YearSelect currentYear={year} startYear={startYear} endYear={endYear} onClick={yearClick} />}
            </div>
        </>
    )

    return <DropdownBox {...restProps} centerDom={centerDom} />
}

export default DatePickerDropdown
