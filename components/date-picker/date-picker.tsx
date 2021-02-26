import React, { FC, useState, KeyboardEvent, MouseEvent } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Input from '../input'
import DatePickerDropdown from './date-picker-dropdown'
import { datePickerProps } from './types'
import { useEffectAfterFirst } from '../_hooks'

const DatePicker: FC<datePickerProps> = (props) => {
    dayjs.extend(customParseFormat)

    const {
        valueType: outValueType,
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

    const gteValueType = () => (outValueType ? outValueType : typeof (outValue || defaultValue) === 'string' ? 'string' : 'Dayjs')
    const valueType = gteValueType()

    const changeTypeToDayjs = (str: string) => (str === '' ? null : dayjs(str, formatText))
    // 处理进入的value
    const hanleInValue = (value: string | Dayjs | null): Dayjs | null =>
        (valueType === 'string' ? changeTypeToDayjs(value as string) : value ? dayjs(value) : null) as Dayjs | null
    // 处理输出的value
    const handleOutValue = (day: Dayjs | null) => (valueType === 'string' ? (day ? day.format(formatText) : '') : day)

    const [visible, setVisible] = useState(false)

    // 选中的 date dayjs对象
    const [virtualSelectedDay, setVirtualSelectedDay] = useState(defaultValue ? hanleInValue(defaultValue) : null)

    const selectedDay = outValue !== undefined ? hanleInValue(outValue) : virtualSelectedDay

    const showText = selectedDay ? selectedDay.format(formatText) : ''

    const [inputValue, setInputValue] = useState(showText)

    const [updateInputValueFalg, setUpdateInputValueFalg] = useState(true)

    const onChange = (day: Dayjs | null) => {
        setVirtualSelectedDay(day)
        if (outOnChange) outOnChange(handleOutValue(day))
        // onchange 一定要重置一下inputValue，不然存在以下情况
        // 设置了固定value，但未设置outOnChange，固定情况，需要重置inputValue
        setUpdateInputValueFalg(!updateInputValueFalg)
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

    // 通过非date点击事件关闭
    const onNotDateClickToClose = () => {
        const inputDay = dayjs(inputValue, [formatText, 'YYYY-MM-DD', 'YYYY-M-DD', 'YYYY-MM-D', 'YYYY-M-D'], true)
        if (inputDay.isValid()) {
            if (inputDay.format(formatText) !== selectedDay?.format(formatText)) {
                onChange(inputDay)
            } else {
                // 未刷新inputValue【关闭时触发的判断机制不一样，支持多种格式】
                setUpdateInputValueFalg(!updateInputValueFalg)
            }
        } else {
            onChange(null)
        }
    }

    // 3种控制 visible
    // 按键事件 通过回车关闭啊
    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            if (visible) {
                onNotDateClickToClose()
            }
            setVisible(!visible)
        } else {
            setVisible(true)
        }
    }

    // 点击date关闭
    const dateClick = (dayjs: Dayjs) => {
        onChange(dayjs)
        setVisible(false)
    }

    // 点击空白区域关闭
    const onEmptyClick = () => {
        setVisible(false)
        // 之前是打开的情况
        if (visible) {
            onNotDateClickToClose()
        }
    }

    const inputClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setVisible(true)
    }

    useEffectAfterFirst(() => {
        if (showText !== inputValue) {
            setInputValue(showText)
        }
    }, [showText, updateInputValueFalg])

    return (
        <DatePickerDropdown
            visible={visible}
            onEmptyClick={onEmptyClick}
            dateClick={dateClick}
            disabledDate={disabledDate}
            autoAdjust
            selectedDay={selectedDay}
            {...restProps}
        >
            <Input
                value={inputValue}
                onValueChange={onInputValueChange}
                onClick={inputClick}
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
