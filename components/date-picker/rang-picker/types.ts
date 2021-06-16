/* eslint-disable no-unused-vars */
import { Dayjs } from 'dayjs'
import { pickerValueOutter as pickerValueOutter2, pickerValueInner as pickerValueInner2, datePickInputProps, wrapperOutProps } from '../date-picker/types'
import { pickerDropdownPropsToOut, wrapperProps } from '../dropdown-box/types'

// 直接导出会报warn
export type pickerValueOutter = pickerValueOutter2
export type pickerValueInner = pickerValueInner2

export { wrapperProps }

export type rangPickerValueOutter = [pickerValueOutter, pickerValueOutter]
export type rangPickerValueInner = [pickerValueInner, pickerValueInner]

export type flowType = 'start1' | 'start2' | 'end1' | 'end2' | 'default'
export type inputType = 'start' | 'end'

export type rangPickerFuncs = {
    close: (v?: rangPickerValueInner) => void
}

export type rangPickerProps = {
    format?: string
    inputFormat?: string[]
    disabledDate?: (currentDate: Dayjs | string) => boolean
    value?: rangPickerValueOutter
    defaultValue?: rangPickerValueOutter
    onChange?: (value: rangPickerValueOutter) => void
    valueType?: 'Dayjs' | 'string'
    textBefore?: string
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    getRatePickerFuncs?: (funcs: rangPickerFuncs) => void
} & wrapperOutProps<rangPickerFuncs> &
    datePickInputProps<[string, string]>

export type rangPickerDropdownProps = {
    disabledDate?: (currentDate: Dayjs) => boolean
    selectedDays: rangPickerValueInner
    dateClick: (days: Dayjs) => void
} & pickerDropdownPropsToOut
