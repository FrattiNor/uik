import DatePickerFC from './date-picker'
import RangPicker from './rang-picker'
import TimePicker from './time-picker'

type DatePickerType = typeof DatePickerFC

interface DatePickerInterFace extends DatePickerType {
    RangPicker: typeof RangPicker
    TimePicker: typeof TimePicker
}

const DatePicker = DatePickerFC as DatePickerInterFace

DatePicker.RangPicker = RangPicker
DatePicker.TimePicker = TimePicker

export default DatePicker

export * from './date-picker/types'
export * from './rang-picker/types'
// export * from './time-picker/types'