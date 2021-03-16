/* eslint-disable no-unused-vars */

import { Dayjs } from 'dayjs'

// 组件外部的值
export type pickerValueOutter = Dayjs | string | null
// 组件内部流通的值
export type pickerValueInner = Dayjs | null

export type datePickInputProps<T> = {
    placeholder?: T
    allowClear?: boolean
    disabled?: boolean
    size?: uikSize
    htmlSize?: number
    error?: boolean
}

export type datePickerProps = {
    format?: string
    disabledDate?: (currentDate: Dayjs | string) => boolean
    value?: pickerValueOutter
    defaultValue?: pickerValueOutter
    onChange?: (value: pickerValueOutter) => void
    valueType?: 'Dayjs' | 'string'
    textBefore?: string
} & datePickInputProps<string>

export type datePickerDropdownProps = {
    disabledDate?: (currentDate: Dayjs) => boolean
    selectedDay: pickerValueInner
    dateClick: (days: Dayjs) => void
    onEmptyClick: () => void
    target: HTMLElement | null
}