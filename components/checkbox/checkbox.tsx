import React, { FC, isValidElement, ChangeEvent, useState } from 'react'
import classnames from 'classnames'
import { useEffectAfterFirst } from '../_hooks'
import { checkboxProps } from './types'
import './checkbox.less'

const Checkbox: FC<checkboxProps> = (props) => {
    const { children, checked: outChecked, disabled, onChange: outOnChange } = props

    const [virtualChecked, setVirtualChecked] = useState(false)
    const [checkedAnimate, setCheckedAnimate] = useState<boolean | ''>('') // 只关于执行动画，初始为''不执行动画
    const checked = typeof outChecked === 'boolean' ? outChecked : virtualChecked

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newChekced = e.target.checked
        setVirtualChecked(newChekced)
    }

    useEffectAfterFirst(() => {
        if (outOnChange) outOnChange(virtualChecked)
    }, [virtualChecked])

    useEffectAfterFirst(() => {
        setCheckedAnimate(checked)
    }, [checked])

    return (
        <label className={classnames('uik-checkbox-wrapper', { disabled })}>
            <span className={classnames('uik-checkbox', { checked, disabled, ['checked-animate']: checkedAnimate })}>
                <input disabled={disabled} type="checkbox" className="uik-checkbox-input" checked={checked} onChange={onChange} />
                <span className={classnames('uik-checkbox-inner', { checked, disabled })} />
            </span>
            {isValidElement(children) ? children : <span>{children}</span>}
        </label>
    )
}

export default Checkbox
