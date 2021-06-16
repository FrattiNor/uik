import DatePickerFC from './date-picker'
import RangPicker from './rang-picker'
import RangPickerBox from './rang-picker-box'

type DatePickerType = typeof DatePickerFC
interface DatePickerInterFace extends DatePickerType {
    RangPicker: typeof RangPicker
    RangPickerBox: typeof RangPickerBox
}

const DatePicker = DatePickerFC as DatePickerInterFace

DatePicker.RangPicker = RangPicker
DatePicker.RangPickerBox = RangPickerBox

export default DatePicker

export * from './date-picker/types'
export * from './rang-picker/types'
export * from './rang-picker-box/types'
