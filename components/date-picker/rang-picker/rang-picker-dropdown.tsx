import React, { FC, useState, MouseEvent } from 'react'
import classnames from 'classnames'
import dayjs from 'dayjs'
import Icon from '../../icon'
import { useEffectAfterFirst } from '../../_hooks'
import DateSelect from '../select/date-select'
import YearSelect from '../select/year-select'
import MonthSelect from '../select/month-select'
import { monthNumber } from '../select/types'
import { rangPickerDropdownProps } from './types'
import DropdownBox from '../dropdown-box'
import './rang-picker-dropdown.less'

const RangPickerDropdown: FC<rangPickerDropdownProps> = (props) => {
    // 使用 setVirtualVisible 关闭， 外部使用 onVisibleChange 监听
    const { selectedDays, dateClick, disabledDate, ...restProps } = props
    const today = dayjs()

    // 保持 显示的 month year 的 dayjs对象
    const [monthAndYearStart, setMonthAndYearStart] = useState(today)
    const monthAndYearEnd = monthAndYearStart.month(monthAndYearStart.month() + 1)

    const yearStart = monthAndYearStart.year()
    const monthStart = (monthAndYearStart.month() + 1) as monthNumber
    const yearEnd = monthAndYearEnd.year()
    const monthEnd = (monthAndYearEnd.month() + 1) as monthNumber

    // 页面显示的 对应 date-日期选择 month-月份选择 year-年份选择
    const [page, setPage] = useState('date')
    // 年份选择 的 title 显示的年份 间距
    const [startYear, setStartYear] = useState(Math.floor(yearStart / 10) * 10 - 1)
    const [endYear, setEndYear] = useState(Math.floor(yearStart / 10) * 10 + 10)

    // title 的 单箭头 next 月份
    const nextMonth = () => {
        setMonthAndYearStart(monthAndYearStart.month(monthAndYearStart.month() + 1))
    }
    // title 的 单箭头 prev 月份
    const prevMonth = () => {
        setMonthAndYearStart(monthAndYearStart.month(monthAndYearStart.month() - 1))
    }
    // title 的 双箭头 next 年份，在年份选择页面则是切换年份间距
    const nextYear = () => {
        if (page === 'year') {
            setStartYear(endYear - 1)
            setEndYear(endYear + 10)
        } else {
            setMonthAndYearStart(monthAndYearStart.year(monthAndYearStart.year() + 1))
        }
    }
    // title 的 双箭头 prev 年份，在年份选择页面则是切换年份间距
    const prevYear = () => {
        if (page === 'year') {
            setStartYear(startYear - 10)
            setEndYear(startYear + 1)
        } else {
            setMonthAndYearStart(monthAndYearStart.year(monthAndYearStart.year() - 1))
        }
    }

    // 月份选择页面的点击事件
    const monthClick = (monthNumber: number) => {
        setMonthAndYearStart(monthAndYearStart.month(monthNumber - 1))
        setPage('date')
    }

    // 年份选择页面的点击事件
    const yearClick = (yearNumber: number) => {
        setMonthAndYearStart(monthAndYearStart.year(yearNumber))
        setPage('date')
    }

    // 标题的年份点击事件
    const titleYearClick = (e: MouseEvent<HTMLSpanElement>) => {
        // e.stopPropagation() 取消默认事件，屏蔽掉全局点击事件【全局点击事件因为会切换page导致组件取消挂载，所以点击会触发visible变false】
        e.stopPropagation()
        setStartYear(Math.floor(yearStart / 10) * 10 - 1)
        setEndYear(Math.floor(yearStart / 10) * 10 + 10)
        setPage('year')
    }
    // 标题的月份的点击事件
    const titleMonthClick = (e: MouseEvent<HTMLSpanElement>) => {
        // e.stopPropagation() 取消默认事件，屏蔽掉全局点击事件【全局点击事件因为会切换page导致组件取消挂载，所以点击会触发visible变false】
        e.stopPropagation()
        setPage('month')
    }

    useEffectAfterFirst(() => {
        if (selectedDays[0] !== null) {
            setMonthAndYearStart(selectedDays[0])
        }
    }, [selectedDays[0]])

    const centerDom = (
        <>
            <div className="uik-rang-picker-title">
                <span className="uik-rang-picker-title-left">
                    <Icon className="uik-rang-picker-title-icon" onClick={prevYear} defaultIcon name="double-arrow-left" />
                    {page === 'date' && <Icon className="uik-rang-picker-title-icon" onClick={prevMonth} defaultIcon name="arrow-left" />}
                </span>
                <span className={classnames('uik-rang-picker-title-center', [`${page}`])}>
                    {page === 'date' && (
                        <>
                            <span className="uik-rang-picker-title-date">
                                <span onClick={titleYearClick} className="uik-rang-picker-title-text click">
                                    {yearStart}年
                                </span>{' '}
                                <span onClick={titleMonthClick} className="uik-rang-picker-title-text click">
                                    {monthStart}月
                                </span>
                            </span>
                            <span className="uik-rang-picker-title-date">
                                <span onClick={titleYearClick} className="uik-rang-picker-title-text click">
                                    {yearEnd}年
                                </span>{' '}
                                <span onClick={titleMonthClick} className="uik-rang-picker-title-text click">
                                    {monthEnd}月
                                </span>
                            </span>
                        </>
                    )}
                    {page === 'month' && <span className="uik-rang-picker-title-text">{yearStart}年</span>}
                    {page === 'year' && (
                        <span className="uik-rang-picker-title-text">
                            {startYear} - {endYear}
                        </span>
                    )}
                </span>
                <span className="uik-rang-picker-title-right">
                    {page === 'date' && <Icon className="uik-rang-picker-title-icon" onClick={nextMonth} defaultIcon name="arrow-right" />}
                    <Icon className="uik-rang-picker-title-icon" onClick={nextYear} defaultIcon name="double-arrow-right" />
                </span>
            </div>
            <div className="uik-rang-picker-content">
                {page === 'date' && (
                    <div className="uik-rang-picker-content-date">
                        <DateSelect
                            year={yearStart}
                            month={monthStart}
                            mutiple
                            selectedDays={selectedDays}
                            disabledDate={disabledDate}
                            onClick={dateClick}
                        />
                        <DateSelect
                            year={yearEnd}
                            month={monthEnd}
                            mutiple
                            selectedDays={selectedDays}
                            disabledDate={disabledDate}
                            onClick={dateClick}
                        />
                    </div>
                )}
                {page === 'month' && <MonthSelect currentMonth={monthStart} onClick={monthClick} />}
                {page === 'year' && <YearSelect currentYear={yearStart} startYear={startYear} endYear={endYear} onClick={yearClick} />}
            </div>
        </>
    )

    return <DropdownBox {...restProps} centerDom={centerDom} />
}

export default RangPickerDropdown
