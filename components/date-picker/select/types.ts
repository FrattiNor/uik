/* eslint-disable no-unused-vars */
import { Dayjs } from 'dayjs'

export type monthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type selectedObj = {
    selected: boolean
    selectedLine: boolean
    selectedLineStart: boolean
    selectedLineEnd: boolean
}

export type dateSelectProps = {
    year: number
    month: monthNumber
    selectedDays?: (Dayjs | null)[]
    onClick?: (day: Dayjs) => void
    disabledDate?: (currentDate: Dayjs) => boolean
    mutiple?: boolean
    onHover?: (day: Dayjs) => void
    hoverDate?: Dayjs | null
}

export type monthSelectProps = {
    currentMonth?: number
    onClick?: (month: number) => void
}

export type yearSelectProps = {
    currentYear?: number
    startYear: number
    endYear: number
    onClick?: (year: number) => void
}
