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
        htmlSize = 11,
        error,
        placeholder = '请选择日期',
        disabledDate: outDisabledDate,
        ...restProps
    } = props

    const inputRef = useRef<HTMLInputElement>(null)
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

    const [flashTextFlag, flashText] = useState(true)

    const judgeSame = (item1: pickerValueOutter, item2: pickerValueOutter | undefined) => {
        if (valueType === 'string') {
            return item1 === item2
        } else {
            return (item1 as Dayjs)?.format(formatText) === (item2 as Dayjs)?.format(formatText)
        }
    }

    const onChange = (day: pickerValueInner) => {
        setVirtualSelectedDay(day)
        if (outOnChange) {
            const newDay = handleOutValue(day)
            if (!judgeSame(newDay, outValue)) {
                outOnChange(newDay)
            }
        }
        // onchange 一定要重置一下inputValue，不然存在以下情况
        // 设置了固定value，但未设置outOnChange，固定情况，需要重置inputValue
        flashText(!flashTextFlag)
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

    const close = (day?: pickerValueInner) => {
        setVisible(false)
        const theDay = day || selectedDay
        onChange(theDay)
        setTimeout(() => inputRef.current?.blur())
    }

    // 通过非date点击事件关闭
    const onNotDateClickToClose = () => {
        const inputDay = dayjs(inputValue, [formatText, 'YYYY-MM-DD', 'YYYY-M-DD', 'YYYY-MM-D', 'YYYY-M-D'], true)
        if (inputDay.isValid()) {
            close(inputDay)
        } else {
            close(null)
        }
    }

    // 3种控制 visible
    // 按键事件 通过回车关闭啊
    const onInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            if (visible) {
                onNotDateClickToClose()
            }
        }
    }

    // 点击date关闭
    const dateClick = (day: Dayjs) => {
        close(day)
    }

    // 点击空白区域关闭
    const onEmptyClick = () => {
        // 之前是打开的情况
        if (visible) {
            onNotDateClickToClose()
        }
    }

    const onInputFocus = () => {
        setVisible(true)
    }

    // 通过别的手段离开组件，Tab等，从focus情况可以了解到
    const onInputBlur = () => {
        onNotDateClickToClose()
    }

    const inputClear = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
        onChange(null)
    }

    useEffectAfterFirst(() => {
        if (showText !== inputValue) {
            setInputValue(showText)
        }
    }, [showText, flashTextFlag])

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
                    ref={inputRef}
                    className={classnames('uik-date-picker-input', [`${size}`])}
                    onChange={onInputChange}
                    onFocus={onInputFocus}
                    onBlur={onInputBlur}
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
