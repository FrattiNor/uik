import React, { FC } from 'react'
import classnames from 'classnames'
import Checkbox from '../checkbox'
import { optionProps } from './types'
import './option.less'

const Option: FC<optionProps> = (props) => {
    const { children, selected, itemClick, value, style, className, isShow, checkBoxItem } = props

    const click = () => {
        if (itemClick) itemClick(value, !!selected)
    }

    return (
        <div className={classnames('uik-select-option', { selected, 'is-show': isShow }, className)} onClick={click} style={style}>
            <div className="uik-select-option-inner">{checkBoxItem ? <Checkbox checked={selected}>{children}</Checkbox> : children}</div>
        </div>
    )
}

export default Option
