import React, { FC, useState, MouseEvent, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import Icon from '../icon'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeProps } from '../_hocs/notice/types'
import { useEffectAfterFirst } from '../_hooks'
import DateSelect from './select/date-select'
import YearSelect from './select/year-select'
import MonthSelect from './select/month-select'
import { datePickerDropdownProps } from './types'
import { monthNumber } from './select/types'
import './date-picker-dropdown.less'

const DatePickerDropdown: FC<datePickerDropdownProps & noticeProps> = (props) => {
    const datePickRef = useRef<HTMLDivElement>(null)
    // 使用 setVirtualVisible 关闭， 外部使用 onVisibleChange 监听
    const { selectedDay, dateClick, disabledDate, onEmptyClick } = props

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

    useEffect(() => {
        // 取消mousedown默认事件，使input不丢失focus
        const mousedown = (e: globalThis.MouseEvent) => {
            const notice = datePickRef.current
            const clickNode = e.target as HTMLElement
            if (notice !== null && clickNode !== null) {
                if (notice === clickNode || notice.contains(clickNode)) {
                    e.preventDefault()
                }
            }
        }
        //  手动添加点击空白事件
        const clickClose = (event: globalThis.MouseEvent) => {
            const notice = datePickRef.current
            const clickNode = event.target as HTMLElement
            // 点击其他区域时, 隐藏指定区域
            // 点击区域不为children，点击区域不为弹出部分，点击区域不为弹出部分的子元素
            if (notice !== null && clickNode !== null) {
                if (!(notice === clickNode || notice.contains(clickNode))) {
                    onEmptyClick()
                }
            }
        }
        document.addEventListener('click', clickClose)
        document.addEventListener('mousedown', mousedown)

        return () => {
            document.removeEventListener('mousedown', mousedown)
            document.removeEventListener('click', clickClose)
        }
    }, [onEmptyClick])

    useEffectAfterFirst(() => {
        if (selectedDay) {
            setMonthAndYear(selectedDay)
        }
    }, [selectedDay])

    return (
        <div className="uik-date-picker" ref={datePickRef}>
            <div className="uik-date-picker-title">
                <span>
                    <Icon className="uik-date-picker-title-icon" onClick={prevYear} defaultIcon name="arrow-double-left" />
                    {page === 'date' && <Icon className="uik-date-picker-title-icon" onClick={prevMonth} defaultIcon name="arrow-left" />}
                </span>
                <span>
                    {page === 'date' && (
                        <>
                            <span onClick={titleYearClick} className="uik-date-picker-title-text click">
                                {year}年
                            </span>{' '}
                            <span onClick={titleMonthClick} onMouseDown={(e) => e.preventDefault()} className="uik-date-picker-title-text click">
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
                    <Icon className="uik-date-picker-title-icon" onClick={nextYear} defaultIcon name="arrow-double-right" />
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
        </div>
    )
}

const DropdownComponent = noticeHoc<datePickerDropdownProps>({
    backgroundColor: '#fff',
    needArrow: false,
    defaultPosition: 'bottomLeft',
    isDropdown: true
})(DatePickerDropdown)

export default noticeRenderHoc<datePickerDropdownProps>({ name: 'date-picker', defaultZIndex: 1002 })(DropdownComponent)
