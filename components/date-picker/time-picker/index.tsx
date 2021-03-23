import React, { FC, useState, KeyboardEvent, MouseEvent, ChangeEvent, useRef } from 'react'
import classnames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import TimePickerDropdown from './time-picker-dropdown'
import { timePickerProps, pickerValueOutter, pickerValueInner, wrapperProps } from './types'
import { useHalfControlled } from '../../_hooks'
import Icon from '../../icon'
import './index.less'

const DatePicker: FC<timePickerProps> = (props) => {
    dayjs.extend(customParseFormat)
    const { CloseIcon } = Icon

    const {
        valueType: outValueType,
        value: outValue,
        defaultValue = null,
        onChange: outOnChange,
        format: formatText = 'HH:mm:ss',
        inputFormat = ['HH:mm:ss', 'H:mm:ss', 'H:m:ss', 'H:m:s', 'HH:m:ss', 'HH:m:s', 'HH:mm:s'],
        allowClear,
        disabled,
        size = 'middle',
        htmlSize = 11,
        error,
        placeholder = '请选择日期',
        disabledDate: outDisabledDate,
        textBefore,
        visible: outVisible,
        onVisibleChange,
        topDom,
        bottomDom,
        leftDom,
        rightDom,
        ...restProps
    } = props

    const textBeforeText = textBefore ? <span className={classnames('uik-time-picker-text-before')}>{textBefore}</span> : ''
    const inputRef = useRef<HTMLInputElement>(null)
    const timePickerRef = useRef<HTMLLabelElement>(null)
    const [hover, setHover] = useState(false)
    const gteValueType = () => (outValueType ? outValueType : typeof (outValue || defaultValue) === 'string' ? 'string' : 'Dayjs')
    const valueType = gteValueType()

    const changeStringToDayjs = (str: string) => (str === '' ? null : dayjs(str, formatText))
    // 处理进入的value
    const hanleInValue = (value: pickerValueOutter): pickerValueInner =>
        (valueType === 'string' ? changeStringToDayjs(value as string) : value ? dayjs(value) : null) as pickerValueInner
    // 处理输出的value
    const handleOutValue = (day: pickerValueInner) => (valueType === 'string' ? (day ? day.format(formatText) : '') : day)

    const [visible, setVisible] = useHalfControlled(outVisible, onVisibleChange, false, 'boolean')

    // 选中的 date dayjs对象
    const [virtualSelectedValue, setVirtualSelectedValue] = useState(defaultValue ? hanleInValue(defaultValue) : null)

    const selectedValue = outValue !== undefined ? hanleInValue(outValue) : virtualSelectedValue

    const showText = selectedValue ? selectedValue.format(formatText) : ''

    const [inputValue, setInputValue] = useState(showText)

    const allowClearShow = !!(allowClear && !disabled && selectedValue && hover)

    const setValueAndText = (v: pickerValueInner, needSetText?: boolean) => {
        setVirtualSelectedValue(v)
        const setText = typeof needSetText === 'boolean' ? needSetText : true
        if (setText) setInputValue(v ? v.format(formatText) : '')
    }

    const judgeSame = (item1: pickerValueOutter, item2: pickerValueOutter | undefined) => {
        if (valueType === 'string') {
            return item1 === item2
        } else {
            return (item1 as Dayjs)?.format(formatText) === (item2 as Dayjs)?.format(formatText)
        }
    }

    const onChange = (day: pickerValueInner, needSetText?: boolean) => {
        setValueAndText(day, needSetText)
        if (outOnChange) {
            const newDay = handleOutValue(day)
            if (!judgeSame(newDay, outValue)) {
                outOnChange(newDay)
            }
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newInputValue = e.target.value
        const inputDay = dayjs(newInputValue, [formatText, ...inputFormat], true)
        setInputValue(newInputValue)
        if (inputDay.isValid()) {
            onChange(inputDay, false)
        }
    }

    const disabledDate = (day: Dayjs) => {
        if (outDisabledDate) {
            return outDisabledDate(handleOutValue(day) as Dayjs | string)
        }
        return false
    }

    // 结束
    const close = (day?: pickerValueInner) => {
        setVisible(false)
        const theDay = day || selectedValue
        onChange(theDay)
        setTimeout(() => inputRef.current?.blur())
    }

    // 开启
    const onInputFocus = () => {
        setVisible(true)
    }

    // 按键事件 通过回车关闭啊
    const onInputKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            if (visible) {
                close()
            }
        }
    }

    // 点击date关闭
    const timeClick = (day: Dayjs) => {
        close(day)
    }

    // 失去焦点
    const onInputBlur = () => {
        close()
    }

    const inputClear = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
        onChange(null)
    }

    const getWrapperDoms = () => {
        const res: wrapperProps = {}
        if (topDom) res.topDom = topDom({ close })
        if (bottomDom) res.bottomDom = bottomDom({ close })
        if (leftDom) res.leftDom = leftDom({ close })
        if (rightDom) res.rightDom = rightDom({ close })
        return res
    }

    return (
        <TimePickerDropdown
            visible={visible}
            timeClick={timeClick}
            disabledDate={disabledDate}
            autoAdjust
            selectedValue={selectedValue}
            target={timePickerRef.current}
            {...getWrapperDoms()}
            {...restProps}
        >
            <label
                ref={timePickerRef}
                className={classnames('uik-date-picker-input-wrapper', [`${size}`], { focus: visible, error, disabled })}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {textBeforeText}
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
                    defaultIconProps={{ name: 'date', size: 14, className: 'uik-date-picker-icon' }}
                    circle
                    size={12}
                    onClick={inputClear}
                    wrapperClassName={classnames('uik-date-picker-close')}
                    visible={allowClearShow}
                />
            </label>
        </TimePickerDropdown>
    )
}

export default DatePicker
