import React, { FC, isValidElement, ChangeEvent } from 'react'
import classnames from 'classnames'
import { checkboxProps } from './types'
import './checkbox.less'
import { useEffectAfterFirst, useStateFromValue } from '../_hooks'

const Checkbox: FC<checkboxProps> = (props) => {
    const { children, checked: outChecked, disabled, onChange: outOnChange } = props

    const [virtualChecked, setVirtualChecked] = useStateFromValue(!!outChecked)
    const checked = typeof outChecked === 'boolean' ? outChecked : virtualChecked

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newChekced = e.target.checked
        setVirtualChecked(newChekced)
    }

    useEffectAfterFirst(() => {
        if (outOnChange) outOnChange(virtualChecked)
    }, [virtualChecked])

    return (
        <label className={classnames('uik-checkbox-wrapper', { disabled })}>
            <span className={classnames('uik-checkbox', { checked, disabled })}>
                <input disabled={disabled} type="checkbox" className="uik-checkbox-input" checked={checked} onChange={onChange} />
                <span className={classnames('uik-checkbox-inner', { checked, disabled })} />
            </span>
            {isValidElement(children) ? children : <span>{children}</span>}
        </label>
    )
}

export default Checkbox
