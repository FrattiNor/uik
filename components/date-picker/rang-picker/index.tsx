import React, { FC, useState, MouseEvent } from 'react'
import classnames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import RangPickerDropdown from './rang-picker-dropdown'
import { useEffectAfterFirst } from '../../_hooks'
import { dateSelectType } from '../select/types'
import { rangPickerProps, rangPickerValueOutter, rangPickerValueInner } from './types'
import './index.less'

const RangPicker: FC<rangPickerProps> = (props) => {
    dayjs.extend(customParseFormat)

    const {
        valueType: outValueType,
        value: outValue,
        defaultValue = [null, null],
        onChange: outOnChange,
        format: formatText = 'YYYY-MM-DD',
        // allowClear,
        // disabled,
        size = 'middle',
        htmlSize = 11,
        // error,
        placeholder = [],
        disabledDate: outDisabledDate,
        ...restProps
    } = props
    const [dateSelectType, setDateSelectType] = useState<dateSelectType>('default')

    const gteValueType = () => (outValueType ? outValueType : typeof (outValue || defaultValue)[0] === 'string' ? 'string' : 'Dayjs')
    const valueType = gteValueType()

    const changeTypeToDayjs = (str: string) => (str === '' ? null : dayjs(str, formatText))
    // // 处理进入的value
    const hanleInValue = (value: rangPickerValueOutter): rangPickerValueInner =>
        (valueType === 'string'
            ? (value as [string, string]).map(changeTypeToDayjs)
            : value.map((valueItem) => (valueItem ? dayjs(valueItem) : null))) as rangPickerValueInner
    // // 处理输出的value
    const handleOutValue = (day: rangPickerValueInner): rangPickerValueOutter =>
        (valueType === 'string' ? day.map((dayItem) => (dayItem ? dayItem.format(formatText) : '')) : day) as rangPickerValueOutter

    const [visible, setVisible] = useState(false)
    const [focus, setFocus] = useState(false)

    // 选中的 date dayjs对象
    const [virtualSelectedDay, setVirtualSelectedDay] = useState<rangPickerValueInner>(defaultValue ? hanleInValue(defaultValue) : [null, null])

    const selectedDays = outValue !== undefined ? hanleInValue(outValue) : virtualSelectedDay

    const showTextStart = selectedDays[0] ? selectedDays[0].format(formatText) : ''
    const showTextEnd = selectedDays[1] ? selectedDays[1].format(formatText) : ''

    const [inputValueStart, setInputValueStart] = useState(showTextStart)
    const [inputValueEnd, setInputValueEnd] = useState(showTextEnd)

    const [updateInputValueFalg, setUpdateInputValueFalg] = useState(true)

    const onChange = (days: rangPickerValueInner) => {
        setVirtualSelectedDay(days)
        if (outOnChange) outOnChange(handleOutValue(days))
        // onchange 一定要重置一下inputValue，不然存在以下情况
        // 设置了固定value，但未设置outOnChange，固定情况，需要重置inputValue
        setUpdateInputValueFalg(!updateInputValueFalg)
    }

    const handleTypeDay = (day: Dayjs, type: dateSelectType) => {
        let res: rangPickerValueInner = [...selectedDays]
        if (type === 'start1') {
            res = [day, null]
        }
        if (type === 'start2') {
            res = [selectedDays[0], day]
        }
        onChange(res)
    }

    const onInputValueChange = (newInputValue: string, type: string) => {
        const inputDay = dayjs(newInputValue, formatText, true)
        if (type === 'start') {
            setInputValueStart(newInputValue)
            if (inputDay.isValid()) {
                onChange([inputDay, selectedDays[1]])
            }
        }
        if (type === 'end') {
            setInputValueEnd(newInputValue)
            if (inputDay.isValid()) {
                onChange([selectedDays[0], inputDay])
            }
        }
    }

    const disabledDate = (day: Dayjs) => {
        if (outDisabledDate) {
            return outDisabledDate(valueType === 'string' ? (day ? day.format(formatText) : '') : day)
        }
        return false
    }

    // // 通过非date点击事件关闭
    // const onNotDateClickToClose = () => {
    //     const inputDay = dayjs(inputValue, [formatText, 'YYYY-MM-DD', 'YYYY-M-DD', 'YYYY-MM-D', 'YYYY-M-D'], true)
    //     if (inputDay.isValid()) {
    //         if (inputDay.format(formatText) !== selectedDay?.format(formatText)) {
    //             onChange(inputDay)
    //         } else {
    //             // 未刷新inputValue【关闭时触发的判断机制不一样，支持多种格式】
    //             setUpdateInputValueFalg(!updateInputValueFalg)
    //         }
    //     } else {
    //         onChange(null)
    //     }
    // }

    // // 3种控制 visible
    // // 按键事件 通过回车关闭啊
    // const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.code === 'Enter') {
    //         if (visible) {
    //             onNotDateClickToClose()
    //         }
    //         setVisible(!visible)
    //     } else {
    //         setVisible(true)
    //     }
    // }

    // 点击date关闭
    const dateClick = (dayjs: Dayjs, type: dateSelectType) => {
        handleTypeDay(dayjs, type)
        if (type === 'start1') {
            setDateSelectType('start2')
        }
        if (type === 'start2') {
            setDateSelectType('default')
            setVisible(false)
        }
    }

    // 点击空白区域关闭
    const onEmptyClick = () => {
        setVisible(false)
        // 之前是打开的情况
        // if (visible) {
        //     onNotDateClickToClose()
        // }
    }

    const inputClick = (e: MouseEvent<HTMLElement>) => {
        // 取消冒泡，点击空白区域关闭在DatePickerDropdown里未包括Input本体
        e.stopPropagation()
        setVisible(true)
        setDateSelectType('start1')
    }

    useEffectAfterFirst(() => {
        if (showTextStart !== inputValueStart) {
            setInputValueStart(showTextStart)
        }
        if (showTextEnd !== inputValueEnd) {
            setInputValueEnd(showTextEnd || '')
        }
    }, [showTextStart, showTextEnd, updateInputValueFalg])

    const onFocus = () => {
        setFocus(true)
    }

    const onBlur = () => {
        setFocus(false)
    }

    return (
        <RangPickerDropdown
            visible={visible}
            onEmptyClick={onEmptyClick}
            dateClick={dateClick}
            disabledDate={disabledDate}
            autoAdjust
            selectedDays={selectedDays}
            dateSelectType={dateSelectType}
            {...restProps}
        >
            <label className={classnames('uik-rang-picker-input-wrapper', [`${size}`], { focus })}>
                <input
                    value={inputValueStart}
                    onChange={(e) => onInputValueChange(e.target.value, 'start')}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    size={htmlSize}
                    className={classnames('uik-rang-picker-input', [`${size}`])}
                    onClick={inputClick}
                    placeholder={placeholder[0] || '开始日期'}
                />
                <span className="uik-rang-picker-input-center">~</span>
                <input
                    value={inputValueEnd}
                    onChange={(e) => onInputValueChange(e.target.value, 'end')}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    size={htmlSize}
                    className={classnames('uik-rang-picker-input', [`${size}`])}
                    onClick={inputClick}
                    placeholder={placeholder[1] || '结速日期'}
                />
            </label>
        </RangPickerDropdown>
    )
}

export default RangPicker
