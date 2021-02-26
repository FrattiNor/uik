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
    disabledDate?: (currentDate: Dayjs | string) => boolean
    value?: Dayjs | string | null
    defaultValue?: Dayjs | string | null
    onChange?: (value: Dayjs | string | null) => void
    valueType?: 'Dayjs' | 'string'
} & datePickInputProps

export type datePickerDropdownProps = {
    disabledDate?: (currentDate: Dayjs) => boolean
    selectedDay: Dayjs | null
    onSelectedDayChange: (days: Dayjs) => void
}
