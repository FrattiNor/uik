import RadioFC from './radio'
import RadioGroup from './radio-group'

type RadioType = typeof RadioFC
interface RadioInterFace extends RadioType {
    Group: typeof RadioGroup
}

const Radio = RadioFC as RadioInterFace

Radio.Group = RadioGroup

export default Radio

export * from './types'
