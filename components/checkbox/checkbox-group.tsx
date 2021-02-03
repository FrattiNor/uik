import React, { FC, useState } from 'react'
import classnames from 'classnames'
import { checkboxGroupProps, checkboxGroupOption } from './types'
import Checkbox from './checkbox'
import { useEffectAfterFirst } from '../_hooks'
import './checkbox-group.less'

const CheckboxGroup: FC<checkboxGroupProps> = (props) => {
    const { checkedList: outCheckedList, defaultCheckedList = [], disabled, options = [], onChange: outOnchange, className } = props

    const [virtualCheckedList, setVirtualCheckedList] = useState(defaultCheckedList)
    const checkedList = Array.isArray(outCheckedList) ? outCheckedList : virtualCheckedList

    const onChange = (value: string) => {
        if (checkedList.includes(value)) {
            setVirtualCheckedList(checkedList.filter((item) => item !== value))
        } else {
            setVirtualCheckedList([...checkedList, value])
        }
    }

    useEffectAfterFirst(() => {
        if (outOnchange) outOnchange(virtualCheckedList)
    }, [virtualCheckedList])

    const DOM = (options as checkboxGroupOption[]).map((item: checkboxGroupOption | string) => {
        const value = typeof item === 'string' ? item : item.value
        const label = typeof item === 'string' ? item : item.label
        const itemDisabled = typeof item === 'string' ? false : item.disabled

        return (
            <Checkbox disabled={itemDisabled || disabled} checked={checkedList.includes(value)} key={label} onChange={() => onChange(value)}>
                {label}
            </Checkbox>
        )
    })

    return <div className={classnames('uik-checkbox-group', className)}>{DOM}</div>
}

export default CheckboxGroup
