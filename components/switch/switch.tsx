import React, { useState, MouseEvent, forwardRef, ForwardRefRenderFunction, useRef } from 'react'
import classnames from 'classnames'
import { useEffectAfterFirst } from '../_hooks'
import { switchProps } from './types'
import './switch.less'

const Switch: ForwardRefRenderFunction<unknown, switchProps> = (props, ref) => {
    const componentRef = useRef<HTMLElement>(null)
    const switchRef = (ref as any) || componentRef
    const { checked: outChecked, disabled, onChange, onMouseDown: outOnMouseDown, onMouseUp: outOnMouseUp } = props
    const [virtualChecked, setVirtualChecked] = useState(false)
    const checked = typeof outChecked === 'boolean' ? outChecked : virtualChecked
    const [mouseDown, setMouseDown] = useState(false)
    const [checkChangeAnimate, setCheckChangeAnimate] = useState<boolean | ''>('') // 只关于执行动画，初始为''不执行动画

    const onMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
        if (outOnMouseUp) outOnMouseUp(e)
        setMouseDown(false)
        setVirtualChecked(!checked)
    }

    const onMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
        if (outOnMouseDown) outOnMouseDown(e)
        setMouseDown(true)
    }

    useEffectAfterFirst(() => {
        if (onChange) onChange(virtualChecked)
    }, [virtualChecked])

    useEffectAfterFirst(() => {
        setCheckChangeAnimate(checked)
    }, [checked])

    return (
        <button
            disabled={disabled}
            ref={switchRef}
            className={classnames('uik-switch', {
                disabled,
                checked,
                ['not-checked']: !checked,
                ['checked-animate']: checkChangeAnimate === true,
                ['not-checked-animate']: checkChangeAnimate === false
            })}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            <div className={classnames('uik-switch-dot', { checked })}>
                <div className={classnames('uik-switch-dot-content', { checked, ['mouse-down']: mouseDown })} />
            </div>
        </button>
    )
}

export default forwardRef(Switch)
