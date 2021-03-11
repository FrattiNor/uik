/* eslint-disable no-unused-vars */
import { Dayjs } from 'dayjs'

const compareDays = (day1: Dayjs, day2: Dayjs, compare: (day1: number, day2: number) => boolean): boolean => {
    const newDay1 = day1.hour(0).minute(0).second(0).millisecond(0)
    const newDay2 = day2.hour(0).minute(0).second(0).millisecond(0)
    return compare(newDay1.valueOf(), newDay2.valueOf())
}

export { compareDays }
