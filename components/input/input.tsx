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
        onChange: outOnChange,
        onEnter: outOnEnter,
        onFocus: outOnFocus,
        onBlur: outOnBlur,
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
        if (outOnChange) outOnChange(value)
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

    const inputFocus = () => {
        inputRef.current.focus()
    }

    return (
        <span
            className={classnames('uik-input', className, {
                disabled,
                focus,
                error,
                'allow-clear': allowClear
            })}
            onClick={inputFocus}
        >
            <span className={classnames('uik-input-content')}>
                <input
                    ref={inputRef}
                    className={classnames('uik-input-content-component', [`${size}`])}
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    disabled={disabled}
                    {...restProps}
                />
                {allowClear && !disabled && (
                    <CloseIcon
                        circle
                        size="small"
                        className={classnames('uik-input-content-close', { show: value })}
                        onClick={() => changeValue('')}
                    />
                )}
            </span>
        </span>
    )
}

export default forwardRef(Input)
