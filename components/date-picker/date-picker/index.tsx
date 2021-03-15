import React, { FC, useState, KeyboardEvent, MouseEvent, ChangeEvent, useRef } from 'react'
import classnames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import DatePickerDropdown from './date-picker-dropdown'
import { datePickerProps, pickerValueOutter, pickerValueInner } from './types'
import { useEffectAfterFirst } from '../../_hooks'
import Icon from '../../icon'
import './index.less'

const DatePicker: FC<datePickerProps> = (props) => {
    dayjs.extend(customParseFormat)
    const { CloseIcon } = Icon

    const {
        valueType: outValueType,
        value: outValue,
        defaultValue = null,
        onChange: outOnChange,
        format: formatText = 'YYYY-MM-DD',
        allowClear,
        disabled,
        size = 'middle',
        htmlSize = 10,
        error,
        placeholder = '请选择日期',
        disabledDate: outDisabledDate,
        ...restProps
    } = props

    const datePickerRef = useRef<HTMLLabelElement>(null)
    const [hover, setHover] = useState(false)
    const gteValueType = () => (outValueType ? outValueType : typeof (outValue || defaultValue) === 'string' ? 'string' : 'Dayjs')
    const valueType = gteValueType()

    const changeStringToDayjs = (str: string) => (str === '' ? null : dayjs(str, formatText))
    // 处理进入的value
    const hanleInValue = (value: pickerValueOutter): pickerValueInner =>
        (valueType === 'string' ? changeStringToDayjs(value as string) : value ? dayjs(value) : null) as pickerValueInner
    // 处理输出的value
    const handleOutValue = (day: pickerValueInner) => (valueType === 'string' ? (day ? day.format(formatText) : '') : day)

    const [visible, setVisible] = useState(false)

    // 选中的 date dayjs对象
    const [virtualSelectedDay, setVirtualSelectedDay] = useState(defaultValue ? hanleInValue(defaultValue) : null)

    const selectedDay = outValue !== undefined ? hanleInValue(outValue) : virtualSelectedDay

    const showText = selectedDay ? selectedDay.format(formatText) : ''

    const [inputValue, setInputValue] = useState(showText)

    const [updateInputValueFalg, setUpdateInputValueFalg] = useState(true)

    const onChange = (day: pickerValueInner) => {
        setVirtualSelectedDay(day)
        if (outOnChange) outOnChange(handleOutValue(day))
        // onchange 一定要重置一下inputValue，不然存在以下情况
        // 设置了固定value，但未设置outOnChange，固定情况，需要重置inputValue
        setUpdateInputValueFalg(!updateInputValueFalg)
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newInputValue = e.target.value
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
    const onInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
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

    const onInputClick = () => {
        setVisible(true)
    }

    const inputClear = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onChange(null)
    }

    useEffectAfterFirst(() => {
        if (showText !== inputValue) {
            setInputValue(showText)
        }
    }, [showText, updateInputValueFalg])

    const allowClearShow = !!(allowClear && !disabled && selectedDay && hover)

    return (
        <DatePickerDropdown
            visible={visible}
            onEmptyClick={onEmptyClick}
            dateClick={dateClick}
            disabledDate={disabledDate}
            autoAdjust
            selectedDay={selectedDay}
            target={datePickerRef.current}
            {...restProps}
        >
            <label
                ref={datePickerRef}
                className={classnames('uik-date-picker-input-wrapper', [`${size}`], { focus: visible, error, disabled })}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <input
                    className={classnames('uik-date-picker-input', [`${size}`])}
                    onChange={onInputChange}
                    onClick={onInputClick}
                    onKeyUp={onInputKeyUp}
                    size={htmlSize}
                    value={inputValue}
                    disabled={disabled}
                    placeholder={placeholder}
                />
                <CloseIcon
                    defaultIconProps={{ name: 'date', size: 'middle', className: 'uik-date-picker-icon' }}
                    circle
                    size="small"
                    onClick={inputClear}
                    wrapperClassName={classnames('uik-date-picker-close')}
                    visible={allowClearShow}
                />
            </label>
        </DatePickerDropdown>
    )
}

export default DatePicker
