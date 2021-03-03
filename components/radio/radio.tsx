import React, { FC, isValidElement, ChangeEvent, useState } from 'react'
import classnames from 'classnames'
import { radioProps } from './types'
import { useEffectAfterFirst, useHalfControlled } from '../_hooks'
import './radio.less'

const Radio: FC<radioProps> = (props) => {
    const { children, checked: outChecked, disabled, onChange: outOnChange, defaultChecked = false, className } = props

    const [checked, setChecked] = useHalfControlled(outChecked, outOnChange, defaultChecked, 'boolean')

    const [checkedAnimate, setCheckedAnimate] = useState<boolean | ''>('') // 只关于执行动画，初始为''不执行动画

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newChekced = e.target.checked
        setChecked(newChekced)
    }

    useEffectAfterFirst(() => {
        setCheckedAnimate(checked)
    }, [checked])

    return (
        <label className={classnames('uik-radio-wrapper', { disabled }, className)}>
            <span className={classnames('uik-radio', { checked, disabled, ['checked-animate']: checkedAnimate })}>
                <input disabled={disabled} type="radio" className="uik-radio-input" checked={checked} onChange={onChange} />
                <span className={classnames('uik-radio-inner', { checked, disabled })} />
            </span>
            {isValidElement(children) ? children : <span>{children}</span>}
        </label>
    )
}

export default Radio
