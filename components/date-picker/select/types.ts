/* eslint-disable no-unused-vars */
import { Dayjs } from 'dayjs'

export type monthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type dateSelectProps = {
    year: number
    month: monthNumber
    selectedDays?: Dayjs[]
    onClick?: (day: Dayjs, selected: boolean) => void
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