import DatePickerFC from './date-picker'
import RangPicker from './rang-picker'

type DatePickerType = typeof DatePickerFC

interface DatePickerInterFace extends DatePickerType {
    RangPicker: typeof RangPicker
}

const DatePicker = DatePickerFC as DatePickerInterFace

DatePicker.RangPicker = RangPicker

export default DatePicker

export * from './date-picker/types'
export * from './rang-picker/types'