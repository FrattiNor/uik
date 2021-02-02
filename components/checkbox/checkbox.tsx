import React, { FC, isValidElement } from 'react'
import { checkboxProps } from './types'
import './checkbox.less'

const Checkbox: FC<checkboxProps> = ({ children }) => {

    return (
        <label className="uik-checkbox">
            <input type="checkbox" />
            {isValidElement(children) ? children : <span>{children}</span>}
        </label>
    )
}

export default Checkbox
