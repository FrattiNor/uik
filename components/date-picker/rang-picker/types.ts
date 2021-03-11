/* eslint-disable no-unused-vars */

import { Dayjs } from 'dayjs'
import { pickerValueOutter, pickerValueInner, datePickInputProps } from '../date-picker/types'
import { dateSelectType } from '../select/types'

export { pickerValueOutter, pickerValueInner }
export type rangPickerValueOutter = [pickerValueOutter, pickerValueOutter]
export type rangPickerValueInner = [pickerValueInner, pickerValueInner]

export type rangPickerProps = {
    format?: string
    disabledDate?: (currentDate: Dayjs | string) => boolean
    value?: rangPickerValueOutter
    defaultValue?: rangPickerValueOutter
    onChange?: (value: rangPickerValueOutter) => void
    valueType?: 'Dayjs' | 'string'
} & datePickInputProps<[string, string]>

export type rangPickerDropdownProps = {
    disabledDate?: (currentDate: Dayjs) => boolean
    selectedDays: rangPickerValueInner
    dateClick: (days: Dayjs, type: dateSelectType) => void
    onEmptyClick: () => void
    dateSelectType: dateSelectType
}

export type inputType = 'start' | 'end'