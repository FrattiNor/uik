import React, { FC, useState, isValidElement, cloneElement, useEffect } from 'react'
import classnames from 'classnames'
import { checkboxGroupProps } from './types'
import Checkbox from './checkbox'
import './checkbox-group.less'

const CheckboxGroup: FC<checkboxGroupProps> = (props) => {
    const { checkedList: outCheckedList, defaultCheckedList = [], disabled, onChange: outOnchange, onCheckedChange, className, children } = props

    const [virtualCheckedList, setVirtualCheckedList] = useState(defaultCheckedList)

    const childValues: string [] = []

    const checkedList = Array.isArray(outCheckedList) ? outCheckedList : virtualCheckedList

    const onChange = (value: string) => {
        let newCheckedList = [...checkedList]
        if (checkedList.includes(value)) {
            newCheckedList = newCheckedList.filter((item) => item !== value)
        } else {
            newCheckedList = [...newCheckedList, value]
        }

        setVirtualCheckedList(newCheckedList)
        if (outOnchange) outOnchange(newCheckedList)
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

    return <div className={classnames('uik-checkbox-group', className)}>{getChild()}</div>
}

export default CheckboxGroup
