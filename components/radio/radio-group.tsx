import React, { cloneElement, FC, isValidElement, useState } from 'react'
import classnames from 'classnames'
import Radio from './radio'
import { radioGroupProps } from './types'
import './radio-group.less'

const RadioGroup: FC<radioGroupProps> = (props) => {
    const { value: outValue, defaultValue = '', onChange: outOnChange, children, className, disabled } = props

    const [virtualValue, setVirtualValue] = useState(defaultValue)

    const value = typeof outValue !== 'undefined' ? outValue : virtualValue

    const onChange = (newValue: string) => {
        setVirtualValue(newValue)
        if (outOnChange) outOnChange(newValue)
    }

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
                        onChange: () => onChange(itemValue),
                    })
                } else {
                    return null
                }
            })
            .filter((item) => item)
    }

    return <div className={classnames('uik-radio-group', className)}>{getChild()}</div>
}

export default RadioGroup
