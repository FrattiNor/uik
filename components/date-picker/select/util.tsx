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

export { getTrueWeak, getWeakName, getYearMonthDate }
