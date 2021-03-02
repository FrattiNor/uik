import React, { FC } from 'react'
import classnames from 'classnames'
import { optionProps } from './types'
import './option.less'

const Option: FC<optionProps> = (props) => {
    const { children, selected, itemClick, value, style, className, isShow } = props

    const click = () => {
        if (itemClick) itemClick(value, !!selected)
    }

    return (
        <div className={classnames('uik-select-option', { selected, 'is-show': isShow }, className)} onClick={click} style={style}>
            <div className="uik-select-option-inner">{children}</div>
        </div>
    )
}

export default Option
