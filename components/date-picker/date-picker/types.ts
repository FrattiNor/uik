/* eslint-disable no-unused-vars */
import { ReactElement } from 'react'
import { Dayjs } from 'dayjs'
import { pickerDropdownPropsToOut, wrapperProps } from '../dropdown-box/types'

export { wrapperProps }

// 组件外部的值
export type pickerValueOutter = Dayjs | string | null
// 组件内部流通的值
export type pickerValueInner = Dayjs | null

export type datePickerFuncs = {
    close: (day?: Dayjs) => void
}

//
export type wrapperOutProps<T> = {
    topDom?: (v: T) => ReactElement
    bottomDom?: (v: T) => ReactElement
    leftDom?: (v: T) => ReactElement
    rightDom?: (v: T) => ReactElement
}

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
    inputFormat?: string[]
    disabledDate?: (currentDate: Dayjs | string) => boolean
    value?: pickerValueOutter
    defaultValue?: pickerValueOutter
    onChange?: (value: pickerValueOutter) => void
    valueType?: 'Dayjs' | 'string'
    textBefore?: string
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
} & wrapperOutProps<datePickerFuncs> &
    datePickInputProps<string>

export type datePickerDropdownProps = {
    disabledDate?: (currentDate: Dayjs) => boolean
    selectedDay: pickerValueInner
    dateClick: (days: Dayjs) => void
} & pickerDropdownPropsToOut
