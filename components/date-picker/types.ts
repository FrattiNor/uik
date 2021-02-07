/* eslint-disable no-unused-vars */

import { Dayjs } from "dayjs"

type formatString = string

export type datePickerInputProps = {
    size?: uikSize
    allowClear?: boolean
}

export type datePickerProps = {
    format?: formatString
    // disabledDate?: (currentDate: formatString) => boolean
    value?: Dayjs | null 
    defaultValue?: Dayjs | null
    onChange?: (value: Dayjs | null) => void
} & datePickerInputProps


export type datePickerDropdownProps = {
    // disabledDate?: (currentDate: formatString) => boolean
    selectedDay: Dayjs | null
    onSelectedDayChange: (days: Dayjs) => void
}