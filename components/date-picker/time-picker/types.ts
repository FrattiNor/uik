/* eslint-disable no-unused-vars */
import { Dayjs } from 'dayjs'
import { pickerValueOutter, pickerValueInner, datePickInputProps, wrapperOutProps } from '../date-picker/types'
import { pickerDropdownPropsToOut, wrapperProps } from '../dropdown-box/types'
import { timeType } from '../select/types'

export { wrapperProps, pickerValueOutter, pickerValueInner }

export type timePickerFuncs = {
    close: (v?: pickerValueInner) => void
}

export type timePickerProps = {
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
} & wrapperOutProps<timePickerFuncs> &
    datePickInputProps<string>

export type timePickerDropdownProps = {
    disabledDate?: (currentDate: Dayjs) => boolean
    selectedValue: pickerValueInner
    timeClick: (num: number, type: timeType) => void
} & pickerDropdownPropsToOut
