import React, { useState, ChangeEvent, KeyboardEvent, forwardRef, ForwardRefRenderFunction, useRef, FocusEvent } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { inputProps } from './types'
import './input.less'

const classList = {
    // 状态 disabled
    disabled: 'uik-input-disabled',
    // 状态 size
    large: 'uik-input-large',
    middle: 'uik-input-middle',
    small: 'uik-input-small'
}

const Input: ForwardRefRenderFunction<unknown, inputProps> = (props, ref) => {
    const componentRef = useRef<HTMLElement>(null)
    const inputRef = (ref as any) || componentRef
    const { CloseIcon } = Icon
    const {
        value: outValue,
        allowClear = false,
        disabled = false,
        maxLength,
        size = 'middle',
        onChange: outOnChange,
        onEnter: outOnEnter,
        onFocus: outOnFocus,
        onBlur: outOnBlur,
        className
    } = props
    const [virtualValue, setVirtualValue] = useState('')
    const [focus, setFocus] = useState(false)
    const value = typeof outValue !== 'undefined' ? outValue : virtualValue

    const changeValue = (v: string) => {
        const len = v.length
        const value = typeof maxLength === 'number' ? (len > maxLength ? v.slice(0, maxLength) : v) : v
        if (outOnChange) {
            outOnChange(value)
        } else {
            setVirtualValue(value)
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value
        changeValue(v)
    }
    const onEnter = (e: ChangeEvent<HTMLInputElement>) => {
        if (outOnEnter) outOnEnter(e.target.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'enter') onEnter((e as unknown) as ChangeEvent<HTMLInputElement>)
    }

    const onFocus = (e: FocusEvent<HTMLInputElement>) => {
        setFocus(true)
        if (typeof outOnFocus === 'function') {
            outOnFocus(e)
        }
    }

    const onBlur = (e: FocusEvent<HTMLInputElement>) => {
        setFocus(false)
        if (typeof outOnBlur === 'function') {
            outOnBlur(e)
        }
    }

    return (
        <span className={classnames('uik-input', classList[size], { [classList['disabled']]: disabled, 'uik-input-focus': focus }, className)}>
            <input
                ref={inputRef}
                className="uik-input-content"
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {allowClear && <CloseIcon className="uik-input-close" onClick={() => changeValue('')} />}
        </span>
    )
}

export default forwardRef(Input)
