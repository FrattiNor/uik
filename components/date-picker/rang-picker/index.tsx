import React, { FC, useState, MouseEvent, useRef } from 'react'
import classnames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import RangPickerDropdown from './rang-picker-dropdown'
import { rangPickerProps, rangPickerValueOutter, rangPickerValueInner, pickerValueInner, inputType, dateSelectType } from './types'
import Icon from '../../icon'
import { compareDays } from './util'
import './index.less'

const typeObj = {
    start: 0,
    end: 1
}

const RangPicker: FC<rangPickerProps> = (props) => {
    const { CloseIcon } = Icon
    dayjs.extend(customParseFormat)

    const {
        valueType: outValueType,
        value: outValue,
        defaultValue = [null, null],
        onChange: outOnChange,
        format: formatText = 'YYYY-MM-DD',
        allowClear,
        disabled,
        size = 'middle',
        htmlSize = 11,
        error,
        placeholder = [],
        disabledDate: outDisabledDate,
        ...restProps
    } = props

    const startDom = useRef<HTMLInputElement>(null)
    const endDom = useRef<HTMLInputElement>(null)
    const [dateSelectType, setDateSelectType] = useState<dateSelectType>('default')

    const gteValueType = () => (outValueType ? outValueType : typeof (outValue || defaultValue)[0] === 'string' ? 'string' : 'Dayjs')
    const valueType = gteValueType()

    const changeStringToDayjs = (str: string) => (str === '' ? null : dayjs(str, formatText))
    // // 处理进入的value
    const hanleInValue = (value: rangPickerValueOutter, type: inputType): pickerValueInner => {
        const v = value[typeObj[type]]
        return valueType === 'string' ? changeStringToDayjs(v as string) : v ? dayjs(v) : null
    }

    // // 处理输出的value
    const handleOutValue = (day: rangPickerValueInner): rangPickerValueOutter =>
        (valueType === 'string' ? day.map((dayItem) => (dayItem ? dayItem.format(formatText) : '')) : day) as rangPickerValueOutter

    const [visible, setVisible] = useState(false)

    const defaultStart = defaultValue ? hanleInValue(defaultValue, 'start') : null
    const defaultEnd = defaultValue ? hanleInValue(defaultValue, 'end') : null
    // 选中的 date dayjs对象
    const [virtualSelectedDayStart, setVirtualSelectedDayStart] = useState<pickerValueInner>(defaultStart)
    const [virtualSelectedDayEnd, setVirtualSelectedDayEnd] = useState<pickerValueInner>(defaultEnd)

    const selectedDayStart = outValue ? hanleInValue(outValue, 'start') : virtualSelectedDayStart
    const selectedDayEnd = outValue ? hanleInValue(outValue, 'end') : virtualSelectedDayEnd

    const showTextStart = selectedDayStart ? selectedDayStart.format(formatText) : ''
    const showTextEnd = selectedDayEnd ? selectedDayEnd.format(formatText) : ''

    const onChange = (day: Dayjs | null, type: inputType) => {
        if (type === 'start') {
            setVirtualSelectedDayStart(day)
            setVirtualSelectedDayEnd(null)
            if (outOnChange) outOnChange(handleOutValue([day, null]))
        }
        if (type === 'end') {
            setVirtualSelectedDayEnd(day)
            if (outOnChange) outOnChange(handleOutValue([selectedDayStart, day]))
        }
    }

    const disabledDate = (day: Dayjs) => {
        let mutipleDisable = false
        let res = false
        if (dateSelectType === 'start2') {
            if (selectedDayStart) {
                mutipleDisable = compareDays(day, selectedDayStart, (a, b) => a < b)
            }
        }
        if (outDisabledDate) {
            res = outDisabledDate(day)
        }
        return res || mutipleDisable
    }

    // 点击date关闭
    const dateClick = (day: Dayjs) => {
        if (dateSelectType === 'start1') {
            setDateSelectType('start2')
            onChange(day, 'start')
        }
        if (dateSelectType === 'start2') {
            setDateSelectType('default')
            setVisible(false)
            onChange(day, 'end')
        }
    }

    // 点击空白区域关闭
    const onEmptyClick = () => {
        setVisible(false)
    }

    const pickerClick = (e: MouseEvent<HTMLElement>) => {
        if (!disabled) {
            setDateSelectType('start1')
            // 取消冒泡，点击空白区域关闭在DatePickerDropdown里未包括Input本体
            e.stopPropagation()
            setVisible(true)
        }
    }

    const onClear = () => {
        setVirtualSelectedDayStart(null)
        setVirtualSelectedDayEnd(null)
        if (outOnChange) outOnChange(handleOutValue([null, null]))
    }

    return (
        <RangPickerDropdown
            visible={visible}
            onEmptyClick={onEmptyClick}
            dateClick={dateClick}
            disabledDate={disabledDate}
            autoAdjust
            selectedDays={[selectedDayStart, selectedDayEnd]}
            {...restProps}
        >
            <label
                className={classnames('uik-rang-picker-input-wrapper', [`${size}`], { focus: visible, error, disabled, ['allow-clear']: allowClear })}
                onClick={pickerClick}
            >
                <input
                    ref={startDom}
                    className={classnames('uik-rang-picker-input', [`${size}`])}
                    size={htmlSize}
                    value={showTextStart}
                    placeholder={placeholder[0] || '开始日期'}
                    readOnly
                    disabled={disabled}
                />
                <span className="uik-rang-picker-center">~</span>
                <input
                    ref={endDom}
                    className={classnames('uik-rang-picker-input', [`${size}`])}
                    size={htmlSize}
                    value={showTextEnd}
                    placeholder={placeholder[1] || '结速日期'}
                    readOnly
                    disabled={disabled}
                />
                <CloseIcon
                    visible={!!(showTextStart || showTextEnd) && allowClear && !disabled}
                    circle
                    size="small"
                    className={classnames('uik-rang-picker-close')}
                    onClick={onClear}
                />
            </label>
        </RangPickerDropdown>
    )
}

export default RangPicker
