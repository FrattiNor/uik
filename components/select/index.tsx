import SelectFC from './select'
import Option from './option'

type SelectType = typeof SelectFC
interface SelectInterFace extends SelectType {
    Option: typeof Option
}

const Select = SelectFC as SelectInterFace

Select.Option = Option

export default Select

export * from './types'
