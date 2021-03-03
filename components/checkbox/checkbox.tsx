import React, { FC, isValidElement, ChangeEvent, useState } from 'react'
import classnames from 'classnames'
import { useEffectAfterFirst, useHalfControlled } from '../_hooks'
import { checkboxProps } from './types'
import './checkbox.less'

const Checkbox: FC<checkboxProps> = (props) => {
    const { children, checked: outChecked, disabled, onChange: outOnChange, checkedHalf, defaultChecked = false, className } = props

    const [checkedAnimate, setCheckedAnimate] = useState<boolean | ''>('') // 只关于执行动画，初始为''不执行动画
    // 理论的checked
    const [theChecked, setChecked] = useHalfControlled(outChecked, outOnChange, defaultChecked, 'boolean')
    // checked判断在checkedHalf之后
    const checked = checkedHalf === true ? false : theChecked

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newChekced = e.target.checked
        setChecked(newChekced)
    }

    useEffectAfterFirst(() => {
        setCheckedAnimate(checked)
    }, [checked])

    return (
        <label className={classnames('uik-checkbox-wrapper', { disabled }, className)}>
            <span className={classnames('uik-checkbox', { ['checked-half']: checkedHalf, checked, disabled, ['checked-animate']: checkedAnimate })}>
                <input disabled={disabled} type="checkbox" className="uik-checkbox-input" checked={checked} onChange={onChange} />
                <span className={classnames('uik-checkbox-inner', { checked, disabled })} />
            </span>
            {isValidElement(children) ? children : <span>{children}</span>}
        </label>
    )
}

export default Checkbox
