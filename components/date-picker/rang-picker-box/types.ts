/* eslint-disable no-unused-vars */

import { Dayjs } from 'dayjs'
import { pickerValueOutter, pickerValueInner, datePickInputProps } from '../date-picker/types'

export { pickerValueOutter, pickerValueInner }
export type rangPickerValueOutter = [pickerValueOutter, pickerValueOutter]
export type rangPickerValueInner = [pickerValueInner, pickerValueInner]

export type flowType = 'start1' | 'start2' | 'end1' | 'end2' | 'default'
export type inputType = 'start' | 'end'

export type rangPickerProps = {
    format?: string
    disabledDate?: (currentDate: Dayjs | string) => boolean
    value?: rangPickerValueOutter
    defaultValue?: rangPickerValueOutter
    onChange?: (value: rangPickerValueOutter) => void
    valueType?: 'Dayjs' | 'string'
    textBefore?: string
} & datePickInputProps<[string, string]>

export type rangPickerDropdownProps = {
    disabledDate?: (currentDate: Dayjs) => boolean
    selectedDays: rangPickerValueInner
    dateClick: (days: Dayjs) => void
    onEmptyClick: () => void
    target: HTMLElement | null
}
