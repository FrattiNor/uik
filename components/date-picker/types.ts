/* eslint-disable no-unused-vars */

import { Dayjs } from 'dayjs'

export type datePickInputProps = {
    placeholder?: string
    allowClear?: boolean
    disabled?: boolean
    maxLength?: number
    size?: uikSize
    htmlSize?: number
    error?: boolean
}

export type datePickerProps = {
    format?: string
    // disabledDate?: (currentDate: formatString) => boolean
    value?: Dayjs | null
    defaultValue?: Dayjs | null
    onChange?: (value: Dayjs | null) => void
} & datePickInputProps

export type datePickerDropdownProps = {
    // disabledDate?: (currentDate: formatString) => boolean
    selectedDay: Dayjs | null
    onSelectedDayChange: (days: Dayjs) => void
}
