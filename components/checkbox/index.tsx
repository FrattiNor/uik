import CheckboxFC from './checkbox'
import CheckboxGroup from './checkbox-group'

type CheckboxType = typeof CheckboxFC
interface CheckboxInterFace extends CheckboxType {
    Group: typeof CheckboxGroup
}

const Checkbox = CheckboxFC as CheckboxInterFace

Checkbox.Group = CheckboxGroup

export default Checkbox

export * from './types'
