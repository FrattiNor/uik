/* eslint-disable no-unused-vars */
import { Dayjs } from 'dayjs'

const dayToZero = (day: Dayjs): Dayjs => day.hour(0).minute(0).second(0).millisecond(0)

const compareDays = (day1: Dayjs, day2: Dayjs, compare: (day1: number, day2: number) => boolean): boolean => {
    const newDay1 = dayToZero(day1)
    const newDay2 = dayToZero(day2)
    return compare(newDay1.valueOf(), newDay2.valueOf())
}

const flowObj = {
    start: ['start1', 'start2'],
    end: ['end1', 'end2']
}

export { compareDays, dayToZero, flowObj }
