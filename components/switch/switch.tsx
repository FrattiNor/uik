import React, { useState, MouseEvent, forwardRef, ForwardRefRenderFunction, useRef } from 'react'
import classnames from 'classnames'
import { switchProps } from './types'
import './switch.less'

const Switch: ForwardRefRenderFunction<unknown, switchProps> = (props, ref) => {
    const componentRef = useRef<HTMLElement>(null)
    const switchRef = (ref as any) || componentRef
    const { checked: outChecked, disabled, onChange, onMouseDown: outOnMouseDown, onMouseUp: outOnMouseUp } = props

    const [virtualChecked, setVirtualChecked] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)

    const checked = typeof outChecked === 'boolean' ? outChecked : virtualChecked

    const onMouseUp = (e: MouseEvent<HTMLButtonElement>) => {
        if (outOnMouseUp) outOnMouseUp(e)
        setMouseDown(false)

        if (onChange) {
            onChange(!checked)
        } else {
            setVirtualChecked(!checked)
        }
    }

    const onMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
        if (outOnMouseDown) outOnMouseDown(e)
        setMouseDown(true)
    }

    return (
        <button
            disabled={disabled}
            ref={switchRef}
            className={classnames('uik-switch', { checked, disabled, ['not-checked']: !checked })}
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
