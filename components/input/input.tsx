import React, { useState, ChangeEvent, KeyboardEvent, forwardRef, ForwardRefRenderFunction, useRef, FocusEvent } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { inputProps } from './types'
import './input.less'

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
        className,
        error,
        ...restProps
    } = props
    const [virtualValue, setVirtualValue] = useState(defaultValue)
    const [focus, setFocus] = useState(false)
    const value = outValue !== undefined ? outValue : virtualValue

    const changeValue = (v: string) => {
        const len = v.length
        const value = typeof maxLength === 'number' ? (len > maxLength ? v.slice(0, maxLength) : v) : v
        setVirtualValue(value)
        if (onValueChange) onValueChange(value)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeValue(e.target.value)
        if (outOnchange) outOnchange(e)
    }
    const onEnter = (e: ChangeEvent<HTMLInputElement>) => {
        if (outOnEnter) outOnEnter(e.target.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') onEnter((e as unknown) as ChangeEvent<HTMLInputElement>)
        if(outOnKeyPress) outOnKeyPress(e)
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
        <span
            className={classnames('uik-input', {
                disabled,
                focus,
                error
            })}
        >
            <span className={classnames('uik-input-content')}>
                <input
                    ref={inputRef}
                    className={classnames('uik-input-content-component', [`${size}`], { 'allow-clear': allowClear }, className)}
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
                    onClick={() => changeValue('')}
                />
            </span>
        </span>
    )
}

export default forwardRef(Input)
