import React, { FC } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import classnames from 'classnames'
import { dateSelectProps } from './types'
import './date-select.less'

const getTrueWeak = (weak: number) => {
    if (weak === 0) {
        return 7
    } else {
        return weak
    }
}

const getWeakName = (weak: number) => {
    switch (weak) {
        case 1:
            return '一'
        case 2:
            return '二'
        case 3:
            return '三'
        case 4:
            return '四'
        case 5:
            return '五'
        case 6:
            return '六'
        case 7:
            return '七'
        default:
            break
    }
}

const getYearMonthDate = (day: Dayjs) => {
    const year = day.year()
    const month = day.month() + 1
    const date = day.date()
    return { year, month, date }
}

const DateSelect: FC<dateSelectProps> = (props) => {
    const { month, year, selectedDays, onClick } = props

    const trueClick = (month: number, date: number, selected: boolean) => {
        if (onClick)
            onClick(
                dayjs()
                    .year(year)
                    .month(month - 1)
                    .date(date),
                !selected // 点击完改变selected状态
            )
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

    // 获取是否选中
    const getSelected = (month: number, date: number): boolean => {
        let isSelectd = false

        if (selectedDays) {
            selectedDays.some((day) => {
                const { year: selectedDayYear, month: selectedDayMonth, date: selectedDayDate } = getYearMonthDate(day)
                if (selectedDayYear === year && selectedDayMonth === month && selectedDayDate === date) {
                    isSelectd = true
                    return true
                }
            })
        }

        return isSelectd
    }

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
    ]

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
            {dateList.map(({ date, monthType, month }) => {
                const selected = getSelected(month, date)
                const today = getToday(month, date)

                return (
                    <div key={date.toString() + month.toString() + monthType} className={classnames('date', monthType)}>
                        <div
                            className={classnames('date-inner', { selected, today })}
                            onClick={(e) => {
                                e.stopPropagation() // 取消冒泡事件，屏蔽掉全局点击事件【全局点击事件因为会切换page导致组件取消挂载，所以点击会触发visible变false】
                                trueClick(month, date, selected)
                            }}
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