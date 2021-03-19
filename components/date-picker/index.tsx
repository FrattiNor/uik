import DatePickerFC from './date-picker'
import RangPicker from './rang-picker'
import TimePicker from './time-picker'
import RangPickerBox from './rang-picker-box'

type DatePickerType = typeof DatePickerFC
interface DatePickerInterFace extends DatePickerType {
    RangPicker: typeof RangPicker
    TimePicker: typeof TimePicker
    RangPickerBox: typeof RangPickerBox
}

const DatePicker = DatePickerFC as DatePickerInterFace

DatePicker.RangPicker = RangPicker
DatePicker.TimePicker = TimePicker
DatePicker.RangPickerBox = RangPickerBox

export default DatePicker

export * from './date-picker/types'
export * from './rang-picker/types'
