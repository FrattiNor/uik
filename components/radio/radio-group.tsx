import React, { cloneElement, FC, isValidElement } from 'react'
import classnames from 'classnames'
import Radio from './radio'
import { radioGroupProps } from './types'
import './radio-group.less'
import { useHalfControlled } from '../_hooks'

const RadioGroup: FC<radioGroupProps> = (props) => {
    const { value: outValue, defaultValue = '', onChange: outOnChange, children, className, disabled } = props

    const [value, setValue] = useHalfControlled(outValue, outOnChange, defaultValue, 'string')

    const onChange = setValue

    const getChild = () => {
        const childs = Array.isArray(children) ? children : [children]
        return childs
            .map((child, index) => {
                if (isValidElement(child) && child.type === Radio) {
                    const itemValue = child.props.value || index
                    const checked = itemValue === value
                    const itemDisabled = disabled || child.props.disabled

                    return cloneElement(child, {
                        key: child.key || index,
                        checked,
                        disabled: itemDisabled,
                        value: itemValue,
                        onChange: () => onChange(itemValue)
                    })
                } else {
                    return null
                }
            })
            .filter((item) => item)
    }

    const dom = getChild()

    return <label className={classnames('uik-radio-group', className)}>{dom}</label>
}

export default RadioGroup
