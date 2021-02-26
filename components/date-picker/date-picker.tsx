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
        valueType = 'Dayjs',
        value: outValue,
        defaultValue = null,
        onChange: outOnChange,
        format: formatText = 'YYYY-MM-DD',
        allowClear,
        disabled,
        maxLength,
        size,
        htmlSize,
        error,
        placeholder,
        disabledDate: outDisabledDate,
        ...restProps
    } = props

    const changeTypeToDayjs = (str: string) => (str === '' ? null : dayjs(str, formatText))
    // 处理进入的value
    const hanleInValue = (value: string | Dayjs | null): Dayjs | null =>
        (valueType === 'string' ? changeTypeToDayjs(value as string) : value ? dayjs(value) : null) as Dayjs | null
    const handleOutValue = (day: Dayjs | null) => (valueType === 'string' ? (day ? day.format(formatText) : '') : day)

    const [visible, setVisible] = useState(false)

    const [showTextChangeFlag, setShowTextChangeFlag] = useState(false)

    // 选中的 date dayjs对象
    const [virtualSelectedDay, setVirtualSelectedDay] = useState(defaultValue ? hanleInValue(defaultValue) : null)

    const selectedDay = outValue !== undefined ? hanleInValue(outValue) : virtualSelectedDay

    const showText = selectedDay ? selectedDay.format(formatText) : ''

    const [inputValue, setInputValue] = useState(showText)

    const onChange = (day: Dayjs | null) => {
        setVirtualSelectedDay(day)
        if (outOnChange) outOnChange(handleOutValue(day))
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
            onChange(inputDay)
        }
    }

    const disabledDate = (day: Dayjs) => {
        if (outDisabledDate) {
            return outDisabledDate(handleOutValue(day) as Dayjs | string)
        }
        return false
    }

    useEffectAfterFirst(() => {
        if (!visible) {
            const inputDay = dayjs(inputValue, [formatText, 'YYYY-MM-DD', 'YYYY-M-DD', 'YYYY-MM-D', 'YYYY-M-D'], true)
            if (inputDay.isValid()) {
                onChange(inputDay)
            } else {
                onChange(null)
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
            selectedDay={selectedDay}
            onSelectedDayChange={onChange}
            disabledDate={disabledDate}
            {...restProps}
        >
            <Input
                value={inputValue}
                onValueChange={onInputValueChange}
                onClick={() => setVisible(true)}
                onKeyUp={onKeyUp}
                onClear={() => onChange(null)}
                placeholder={placeholder || '请选择日期'}
                allowClear={typeof allowClear === 'boolean' ? allowClear : true}
                htmlSize={htmlSize || 11}
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
