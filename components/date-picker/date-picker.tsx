import React, { FC, useState, KeyboardEvent } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Input from '../input'
import DatePickerDropdown from './date-picker-dropdown'
import { datePickerProps } from './types'
import { useEffectAfterFirst } from '../_hooks'

const DatePicker: FC<datePickerProps> = (props) => {
    dayjs.extend(customParseFormat)

    const {
        value: outValue,
        defaultValue,
        onChange,
        format: formatText = 'YYYY-MM-DD',
        allowClear,
        disabled,
        maxLength,
        size,
        htmlSize,
        error,
        placeholder
    } = props

    const [visible, setVisible] = useState(false)

    const [showTextChangeFlag, setShowTextChangeFlag] = useState(false)

    // 选中的 date dayjs对象
    const [virtualSelectedDay, setVirtualSelectedDay] = useState(defaultValue || null)

    const selectedDay = outValue !== undefined ? outValue : virtualSelectedDay

    const showText = selectedDay ? selectedDay.format(formatText) : ''

    const [inputValue, setInputValue] = useState(showText)

    const trueOnChange = (day: Dayjs | null) => {
        setVirtualSelectedDay(day)
        if (onChange) onChange(day)
        setShowTextChangeFlag(!showTextChangeFlag)
    }

    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            setVisible(!visible)
        } else {
            setVisible(true)
        }
    }

    const onInputValueChange = (newInputValue: string) => {
        const inputDay = dayjs(newInputValue, formatText, true)
        setInputValue(newInputValue)
        if (inputDay.isValid()) {
            trueOnChange(inputDay)
        }
    }

    useEffectAfterFirst(() => {
        if (!visible) {
            const inputDay = dayjs(inputValue, [formatText, 'YYYY-MM-DD', 'YYYY-M-DD', 'YYYY-MM-D', 'YYYY-M-D'], true)
            if (inputDay.isValid()) {
                trueOnChange(inputDay)
            } else {
                trueOnChange(null)
            }
        }
    }, [visible])

    useEffectAfterFirst(() => {
        setInputValue(showText)
    }, [showText, showTextChangeFlag])

    return (
        <DatePickerDropdown
            visible={visible}
            onVisibleChange={setVisible}
            autoAdjust
            selectedDay={selectedDay?.isValid() ? selectedDay : null}
            onSelectedDayChange={trueOnChange}
            {...props}
        >
            <Input
                value={inputValue}
                onValueChange={onInputValueChange}
                onClick={() => setVisible(true)}
                onKeyUp={onKeyUp}
                onClear={() => trueOnChange(null)}
                placeholder={placeholder || '请选择日期'}
                allowClear={typeof allowClear === 'boolean' ? allowClear : true}
                htmlSize={htmlSize || 10}
                style={{ width: 'auto' }}
                disabled={disabled}
                maxLength={maxLength}
                size={size}
                error={error}
            />
        </DatePickerDropdown>
    )
}

export default DatePicker
