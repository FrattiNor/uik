import React, { FC, isValidElement, cloneElement, useEffect } from 'react'
import classnames from 'classnames'
import { checkboxGroupProps } from './types'
import Checkbox from './checkbox'
import './checkbox-group.less'
import { useHalfControlled } from '../_hooks'

const CheckboxGroup: FC<checkboxGroupProps> = (props) => {
    const { checkedList: outCheckedList, defaultCheckedList = [], disabled, onChange: outOnchange, onCheckedChange, className, children } = props

    const childValues: string[] = []

    const [checkedList, setCheckedList] = useHalfControlled(outCheckedList, outOnchange, defaultCheckedList, (l) => Array.isArray(l))

    const onChange = (value: string) => {
        let newCheckedList = [...checkedList]
        if (checkedList.includes(value)) {
            newCheckedList = newCheckedList.filter((item) => item !== value)
        } else {
            newCheckedList = [...newCheckedList, value]
        }

        setCheckedList(newCheckedList)
    }

    useEffect(() => {
        const checkedAll = childValues.every((item) => checkedList.includes(item))
        const checkedHalf = !checkedAll && checkedList.some((item) => childValues.includes(item))
        if (onCheckedChange) onCheckedChange(checkedAll, checkedHalf)
    }, [checkedList])

    const getChild = () => {
        const childs = Array.isArray(children) ? children : [children]
        const dom = childs
            .map((child, index) => {
                if (isValidElement(child) && child.type === Checkbox) {
                    const itemValue = child.props.value || index
                    const itemDisabled = disabled || child.props.disabled
                    const checked = checkedList.includes(itemValue)
                    childValues.push(itemValue)
                    return cloneElement(child, {
                        key: child.key || index,
                        checked,
                        disabled: itemDisabled,
                        onChange: () => onChange(itemValue)
                    })
                } else {
                    return null
                }
            })
            .filter((item) => item)
        return dom
    }

    const dom = getChild()

    return <label className={classnames('uik-checkbox-group', className)}>{dom}</label>
}

export default CheckboxGroup
