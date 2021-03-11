import React, { useState, ChangeEvent, KeyboardEvent, forwardRef, ForwardRefRenderFunction, useRef, FocusEvent, MouseEvent } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { inputProps } from './types'
import './input.less'
import { useHalfControlled } from '../_hooks'

const Input: ForwardRefRenderFunction<unknown, inputProps> = (props, ref) => {
    const componentRef = useRef<HTMLElement>(null)
    const inputRef = (ref as any) || componentRef

    const { CloseIcon } = Icon
    const {
        value: outValue,
        defaultValue = '',
        allowClear = false,
        disabled = false,
        maxLength,
        size = 'middle',
        onValueChange,
        onChange: outOnchange,
        onEnter: outOnEnter,
        onFocus: outOnFocus,
        onBlur: outOnBlur,
        onKeyPress: outOnKeyPress,
        onClear: outOnClear,
        className,
        style = {},
        error,
        htmlSize,
        width,
        ...restProps
    } = props
    const [focus, setFocus] = useState(false)

    // 理论上的value
    const [theValue, setValue] = useHalfControlled(outValue, onValueChange, defaultValue, 'string')
    // 受maxLength影响
    const value = typeof maxLength === 'number' ? (theValue.length > maxLength ? theValue.slice(0, maxLength) : theValue) : theValue

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        if (outOnchange) outOnchange(e)
    }
    const onEnter = () => {
        if (outOnEnter) outOnEnter(value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') onEnter()
        if (outOnKeyPress) outOnKeyPress(e)
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

    const onClear = (e: MouseEvent<HTMLElement>) => {
        if (outOnClear) {
            outOnClear(e, value)
        } else {
            setValue('')
        }
    }

    const inputStyle = { ...style, ...(typeof width === 'number' ? { width } : {}) }
    const inputClass = classnames(
        'uik-input',
        {
            disabled,
            focus,
            error
        },
        className
    )

    return (
        <label className={inputClass} style={inputStyle} ref={inputRef}>
            <span className={classnames('uik-input-content', [`${size}`])}>
                <input
                    size={htmlSize}
                    className={classnames('uik-input-content-component', [`${size}`], { 'allow-clear': allowClear })}
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    disabled={disabled}
                    {...restProps}
                />
                <CloseIcon
                    visible={!!value && allowClear && !disabled}
                    circle
                    size="small"
                    className={classnames('uik-input-content-close')}
                    onClick={onClear}
                />
            </span>
        </label>
    )
}

export default forwardRef(Input)
