/* eslint-disable no-unused-vars */
import { Dayjs } from 'dayjs'

const getTrueWeak = (weak: number): number => {
    if (weak === 0) {
        return 7
    } else {
        return weak
    }
}

const getWeakName = (weak: number): string => {
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
            return '日'
        default:
            return ''
    }
}

const getYearMonthDate = (day: Dayjs): { year: number; month: number; date: number } => {
    const year = day.year()
    const month = day.month() + 1
    const date = day.date()
    return { year, month, date }
}

const compareDays = (day1: Dayjs, day2: Dayjs, compare: (day1: number, day2: number) => boolean): boolean => {
    const newDay1 = day1.hour(0).minute(0).second(0).millisecond(0)
    const newDay2 = day2.hour(0).minute(0).second(0).millisecond(0)
    return compare(newDay1.valueOf(), newDay2.valueOf())
}

export { getTrueWeak, getWeakName, getYearMonthDate, compareDays }
