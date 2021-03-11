import React, { FC, MouseEvent } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classnames from 'classnames'
import { dateSelectProps, selectedObj } from './types'
import { getTrueWeak, getWeakName, getYearMonthDate } from './util'
import './date-select.less'

const DateSelect: FC<dateSelectProps> = (props) => {
    const { month, year, selectedDays, onClick: outOnClick, disabledDate: outDisabledDate, mutiple = false } = props
    // dayjs
    const thisMonthFirstDay = dayjs()
        .year(year)
        .month(month - 1)
        .date(1)
    const prevMonthLastDay = thisMonthFirstDay.date(0)
    const nextMonthFirstDay = dayjs().year(year).month(month).date(1)
    const thisMonthLastDay = nextMonthFirstDay.date(0)
    // weak number
    const thisMonthFirstDayWeak = getTrueWeak(thisMonthFirstDay.day())
    // const thisMonthLastDayWeak = getTrueWeak(thisMonthLastDay.day())
    // date number
    const thisMonthFirstDayDate = thisMonthFirstDay.date()
    const prevMonthLastDayDate = prevMonthLastDay.date()
    const thisMonthLastDayDate = thisMonthLastDay.date()
    const nextMonthFirstDayDate = nextMonthFirstDay.date()
    // date number
    const prevMonthDateNumber = thisMonthFirstDayWeak - 1
    const thisMonthDateNumber = thisMonthLastDayDate - thisMonthFirstDayDate + 1
    const nextMonthDateNumber = 42 - prevMonthDateNumber - thisMonthDateNumber
    // const nextMonthDateNumber = 7 - thisMonthLastDayWeak

    const getCurrentDay = (month: number, date: number) => {
        return dayjs()
            .year(year)
            .month(month - 1)
            .date(date)
    }

    const onClick = (e: MouseEvent<HTMLElement>, disabled: boolean, month: number, date: number) => {
        e.stopPropagation() // 取消冒泡事件，屏蔽掉全局点击事件【全局点击事件因为会切换page导致组件取消挂载，所以点击会触发visible变false】
        if (!disabled && outOnClick) {
            outOnClick(getCurrentDay(month, date))
        }
    }

    // 获取是否是今天
    const getToday = (month: number, date: number): boolean => {
        // today
        const { year: thisDayYear, month: thisDayMonth, date: thisDayDate } = getYearMonthDate(dayjs())

        if (thisDayYear === year && thisDayMonth === month && thisDayDate === date) {
            return true
        }

        return false
    }

    const disabledDate = (day: Dayjs) => {
        if (outDisabledDate) {
            return outDisabledDate(day)
        }
        return false
    }

    const getDisabled = (month: number, date: number): boolean => {
        // disabled
        const disabled = disabledDate(getCurrentDay(month, date))

        return disabled
    }

    const judgeSelected = (month: number, date: number, day: Dayjs | null): boolean => {
        let res = false
        if (day) {
            const { year: selectedDayYear, month: selectedDayMonth, date: selectedDayDate } = getYearMonthDate(day)
            if (selectedDayYear === year && selectedDayMonth === month && selectedDayDate === date) {
                res = true
            }
        }
        return res
    }

    // 获取是否选中
    const getSelected = (month: number, date: number): selectedObj => {
        let selected = false
        let selectedLine = false
        let selectedLineStart = false
        let selectedLineEnd = false

        if (!mutiple) {
            if (selectedDays) {
                selectedDays.some((day) => {
                    selected = judgeSelected(month, date, day)
                    return selected
                })
            }
        } else {
            const theDay = getCurrentDay(month, date)
            const dayString = theDay.valueOf()
            const start = selectedDays?.[0] || null
            const end = selectedDays?.[1] || null
            const startSelected = judgeSelected(month, date, start)
            const endSelected = judgeSelected(month, date, end)
            selected = startSelected || endSelected
            if (start && end && startSelected) selectedLineStart = true
            if (start && end && endSelected) selectedLineEnd = true
            if (!selected) {
                if (start && end) {
                    // 这样比较会有一些小问题，dayString是后生成的，时分秒会比start和end的时分秒大，如何dayString和start同天，但是 dayString > start.valueOf() 为true
                    if (dayString > start.valueOf() && dayString < end.valueOf()) {
                        selectedLine = true
                    }
                }
            }
        }

        return { selected, selectedLine, selectedLineStart, selectedLineEnd }
    }

    const dateList = [
        ...Array(prevMonthDateNumber)
            .fill('')
            .map((_, i) => ({ date: prevMonthLastDayDate - i, monthType: 'prev-month', month: month - 1 }))
            .reverse(),
        ...Array(thisMonthDateNumber)
            .fill('')
            .map((_, i) => ({ date: thisMonthFirstDayDate + i, monthType: 'this-month', month: month })),
        ...Array(nextMonthDateNumber)
            .fill('')
            .map((_, i) => ({ date: nextMonthFirstDayDate + i, monthType: 'next-month', month: month + 1 }))
    ].map(({ date, monthType, month }) => {
        const { selected, selectedLine, selectedLineStart, selectedLineEnd } = getSelected(month, date)
        return {
            date,
            monthType,
            month,
            selected,
            selectedLine,
            selectedLineStart,
            selectedLineEnd,
            today: getToday(month, date),
            disabled: getDisabled(month, date)
        }
    })

    const titleList = Array(7)
        .fill('')
        .map((_, i) => getWeakName(i + 1))

    return (
        <div className="uik-date-select">
            {titleList.map((date, i) => (
                <div key={i} className="date-title">
                    {date}
                </div>
            ))}
            {dateList.map(({ date, monthType, month, selected, selectedLine, selectedLineStart, selectedLineEnd, today, disabled }) => {
                const isThisMonth = monthType === 'this-month'

                return (
                    <div
                        key={year.toString() + date.toString() + month.toString() + monthType}
                        className={classnames('date', {
                            disabled,
                            ['selected-line']: selectedLine && isThisMonth,
                            ['selected-line-start']: selectedLineStart && isThisMonth,
                            ['selected-line-end']: selectedLineEnd && isThisMonth
                        })}
                    >
                        <div
                            className={classnames('date-inner', monthType, {
                                disabled,
                                selected: selected && isThisMonth,
                                today: today && isThisMonth
                            })}
                            onClick={(e) => onClick(e, disabled, month, date)}
                        >
                            {date}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DateSelect
