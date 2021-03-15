import React, { FC, useState, useRef, MouseEvent, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import classnames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Icon from '../../icon'
import RangPickerDropDown from './rang-picker-dropdown'
import { useDebounce } from '../../_hooks'
import { rangPickerProps, rangPickerValueInner, rangPickerValueOutter, inputType, flowType } from './types'
import { flowObj, compareDays, dayToZero } from './util'
import './index.less'

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
        htmlSize = 10,
        error,
        placeholder = [],
        disabledDate: outDisabledDate,
        ...restProps
    } = props

    // input的ref
    const startDom = useRef<HTMLInputElement>(null)
    const endDom = useRef<HTMLInputElement>(null)
    // input的focus选中的值，控制底部样式
    const [focusInput, setFocusInput] = useState<inputType | ''>('')
    const inputBottomStyle = () => {
        if (!focusInput) {
            return { opacity: 0 }
        } else {
            switch (focusInput) {
                case 'start':
                    return { left: startDom.current?.offsetLeft, width: startDom.current?.clientWidth, opacity: 1 }
                case 'end':
                    return { left: endDom.current?.offsetLeft, width: endDom.current?.clientWidth, opacity: 1 }
                default:
                    return { opacity: 0 }
            }
        }
    }
    // 窗口开关
    const [visible, setVisible] = useState(false)
    // 传入值的type类型
    const valueType = outValueType ? outValueType : typeof (outValue || defaultValue)[0] === 'string' ? 'string' : 'Dayjs'
    // 处理传入的值
    const handleToOutter = (days: rangPickerValueInner) => {
        return (valueType === 'string' ? days.map((item) => (item ? item.format(formatText) : '')) : days) as rangPickerValueOutter
    }
    // 处理传出的值
    const handleToInner = (days: rangPickerValueOutter) => {
        return (valueType === 'string'
            ? days.map((item) => (item ? dayjs(item as string, formatText) : null))
            : days.map((item) => (item ? dayjs(item as Dayjs) : null))) as rangPickerValueInner
    }
    // 处理好的defaultValue
    const innerDefaultValue: rangPickerValueInner = handleToInner(defaultValue)
    // 组件内部的value
    const [value, setValue] = useState<rangPickerValueInner>(innerDefaultValue)
    // 刷新value的值的flag
    const [flashValueFlag, flashValue] = useState(false)
    // 使用value格式化的input值
    const startText = value[0] ? value[0].format(formatText) : ''
    const endText = value[1] ? value[1].format(formatText) : ''
    // input的值
    const [inputText, setInputText] = useState<[string, string]>([startText, endText])
    // 刷新input的值的flag
    const [flashTextFlag, flashText] = useState(false)
    // 将外部的value替换掉内部的value
    const pushOutValueToValue = () => {
        const innerValue: rangPickerValueInner = outValue ? handleToInner(outValue) : [null, null]
        setValue(innerValue)
    }
    // 工作流
    const [endFlow, setEndFlow] = useState<flowType[]>([])
    const [flow, setFlow] = useState<flowType[]>([])
    // 关闭工作流
    const closeFlow = () => {
        setFlow([])
        setEndFlow([])
    }
    // 新创建流
    const newFlow = (type: inputType) => {
        setFlow((flowObj[type] || []) as flowType[])
        setEndFlow([])
    }
    // 返回上一步
    const returnBeforeStep = () => {
        const newFlow = [...flow]
        const newEndFlow = [...endFlow]
        const endStep = newEndFlow.pop()
        if (endStep) newFlow.unshift(endStep)
        setFlow(newFlow)
        setEndFlow(newEndFlow)
    }
    // 下一步
    const toNextStep = () => {
        const newFlow = [...flow]
        const newEndFlow = [...endFlow]
        const endStep = newFlow.shift()
        if (endStep) newEndFlow.push(endStep)
        setFlow(newFlow)
        setEndFlow(newEndFlow)
    }
    // 当前流程
    const step = flow[0] || false

    // 用于触发外界的onChange
    const onChange = (days: rangPickerValueInner) => {
        setValue(days)
        if (outOnChange) outOnChange(handleToOutter(days))
        // 如果没有onChange，需要把外部值重新赋值一次
        flashValue(!flashValueFlag)
    }

    // 结速流程的标记，并关闭窗口
    const close = (days?: rangPickerValueInner) => {
        const theValue = days || value
        setVisible(false)
        setTimeout(() => endDom.current?.blur())
        setTimeout(() => startDom.current?.blur())

        if (step) {
            closeFlow()
        }

        // 结束流程触发onChange
        if (theValue[0] && theValue[1] && theValue[0].valueOf() < theValue[1].valueOf()) {
            onChange(theValue)
        } else {
            onChange([null, null])
        }
        flashText(!flashTextFlag)
    }

    // 点击空白区域关闭
    const onEmptyClick = () => {
        if (visible) {
            close()
        }
    }

    // 日期点击事件
    const dateClick = (day: Dayjs) => {
        const newDay = dayToZero(day)
        if (step === 'start1' || step === 'end2') {
            setValue([newDay, value[1]])
            if (step === 'start1') {
                setTimeout(() => endDom.current?.focus())
            }
            if (step === 'end2') {
                // 在函数内部调用函数，需要传入新的value，不然获取的一直是之前的value
                close([newDay, value[1]])
            }
        }
        if (step === 'end1' || step === 'start2') {
            setValue([value[0], newDay])
            if (step === 'end1') {
                setTimeout(() => startDom.current?.focus())
            }
            if (step === 'start2') {
                close([value[0], newDay])
            }
        }
    }

    // 禁用日期
    const disabledDate = (day: Dayjs) => {
        let res = false
        let stepDisabledDate = false
        if (outDisabledDate) {
            res = outDisabledDate(day)
        }
        if (step === 'start2' && value[0]) {
            stepDisabledDate = compareDays(value[0], day, (a, b) => a > b)
        }
        if (step === 'end2' && value[1]) {
            stepDisabledDate = compareDays(value[1], day, (a, b) => a < b)
        }
        return res || stepDisabledDate
    }

    // 取消冒泡
    const stopPropagation = (e: MouseEvent<HTMLElement>) => {
        // 取消冒泡，点击空白区域关闭在DatePickerDropdown里未包括Input本体
        e.stopPropagation()
    }

    // 节流改变focus状态
    const changeFocus = useDebounce((type: inputType | '') => {
        setFocusInput(type)
    }, 200)

    // input的focus事件
    const inputFocus = (type: inputType) => {
        setVisible(true)
        changeFocus(type)

        if (!step) {
            newFlow(type as inputType)
        }
        if ((step === 'start2' && type === 'start') || (step === 'end2' && type === 'end')) {
            returnBeforeStep()
        }
        if (step === 'start1' && type === 'end') {
            if (value[0]) {
                toNextStep()
            } else {
                newFlow(type)
                // 为了刷新text
                flashText(!flashTextFlag)
            }
        }
        if (step === 'end1' && type === 'start') {
            if (value[1]) {
                toNextStep()
            } else {
                newFlow(type)
                // 为了刷新text
                flashText(!flashTextFlag)
            }
        }
    }

    // input的blur事件
    const inputBlur = () => {
        changeFocus('')
    }

    // input的change事件
    const inputChange = (e: ChangeEvent<HTMLInputElement>, type: inputType) => {
        const v = e.target.value
        const inputDay = dayjs(v, formatText, true)
        if (type === 'start') {
            if (inputDay.isValid()) {
                setValue([inputDay, value[1]])
            } else {
                setInputText([v, inputText[1]])
            }
        }
        if (type === 'end') {
            if (inputDay.isValid()) {
                setValue([value[0], inputDay])
            } else {
                setInputText([inputText[0], v])
            }
        }
    }

    // input的keydown事件
    const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>, type: inputType) => {
        if (e.code === 'Tab') e.preventDefault()
        if (e.code === 'Enter' || e.code === 'Tab') {
            if (type === 'start') {
                if (step === 'start1') {
                    setTimeout(() => endDom.current?.focus())
                }
                if (step === 'end2') {
                    close()
                }
            }
            if (type === 'end') {
                if (step === 'start2') {
                    close()
                }
                if (step === 'end1') {
                    setTimeout(() => startDom.current?.focus())
                }
            }
        }
    }

    // 清除
    const onClear = (e: MouseEvent) => {
        e.preventDefault()
        close([null, null])
    }

    // 外部value改变替换内部value
    useEffect(() => {
        if (outValue) {
            pushOutValueToValue()
        }
    }, [outValue, flashValueFlag])

    // 刷新input的值
    useEffect(() => {
        setInputText([startText, endText])
    }, [startText, endText, flashTextFlag])

    const allowClearShow = !!(value[0] && value[1]) && allowClear && !disabled

    return (
        <RangPickerDropDown
            visible={visible}
            onEmptyClick={onEmptyClick}
            dateClick={dateClick}
            disabledDate={disabledDate}
            autoAdjust
            selectedDays={value}
            {...restProps}
        >
            <label
                className={classnames('uik-rang-picker-input-wrapper', [`${size}`], { focus: visible, error, disabled })}
                onClick={stopPropagation}
            >
                <input
                    ref={startDom}
                    size={htmlSize}
                    value={inputText[0]}
                    disabled={disabled}
                    placeholder={placeholder[0] || '开始日期'}
                    className={classnames('uik-rang-picker-input', [`${size}`])}
                    onBlur={inputBlur}
                    onClick={stopPropagation}
                    onFocus={() => inputFocus('start')}
                    onChange={(e) => inputChange(e, 'start')}
                    onKeyDown={(e) => inputKeyDown(e, 'start')}
                />
                <span className="uik-rang-picker-center">~</span>
                <input
                    ref={endDom}
                    size={htmlSize}
                    value={inputText[1]}
                    disabled={disabled}
                    placeholder={placeholder[1] || '结束日期'}
                    className={classnames('uik-rang-picker-input', [`${size}`])}
                    onBlur={inputBlur}
                    onClick={stopPropagation}
                    onFocus={() => inputFocus('end')}
                    onChange={(e) => inputChange(e, 'end')}
                    onKeyDown={(e) => inputKeyDown(e, 'end')}
                />
                <span className="uik-rang-picker-input-bottom" style={inputBottomStyle()} />
                <CloseIcon
                    defaultIcon="date"
                    defaultIconSize="middle"
                    defaultIconProps={{ className: 'uik-rang-picker-icon' }}
                    circle
                    size="small"
                    onClick={onClear}
                    className={classnames('uik-rang-picker-close')}
                    visible={allowClearShow}
                />
            </label>
        </RangPickerDropDown>
    )
}

export default RangPicker
