/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useRef, MouseEvent, useEffect, ChangeEvent, KeyboardEvent, useLayoutEffect } from 'react'
import classnames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Icon from '../../icon'
import RangPickerDropDown from './rang-picker-dropdown'
import { useDebounce, useEffectAfterFirst, useHalfControlled } from '../../_hooks'
import { flowObj, compareDays, dayToZero } from './util'
import {
    rangPickerProps,
    rangPickerValueInner,
    rangPickerValueOutter,
    inputType,
    flowType,
    pickerValueOutter,
    pickerValueInner,
    wrapperProps
} from './types'
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
        inputFormat = ['YYYY-MM-DD', 'YYYY-M-DD', 'YYYY-MM-D', 'YYYY-M-D'],
        allowClear,
        disabled,
        size = 'middle',
        htmlSize = 11,
        error,
        placeholder = [],
        disabledDate: outDisabledDate,
        textBefore,
        visible: outVisible,
        onVisibleChange,
        getRatePickerFuncs,
        topDom,
        bottomDom,
        leftDom,
        rightDom,
        ...restProps
    } = props

    // === utils === //
    // 处理传入的值
    const handleToOutter = (days: rangPickerValueInner) => {
        return (valueType === 'string' ? days.map((item) => (item ? item.format(formatText) : '')) : days) as rangPickerValueOutter
    }
    // 处理传出的值
    const handleToInner = (days: rangPickerValueOutter): rangPickerValueInner => {
        const innerValue = (valueType === 'string'
            ? days.map((item) => (item ? dayjs(item as string, formatText) : null))
            : days.map((item) => (item ? dayjs(item as Dayjs) : null))) as rangPickerValueInner

        if (innerValue[0] && innerValue[1] && innerValue[0].valueOf() <= innerValue[1].valueOf()) {
            return innerValue
        } else {
            return [null, null]
        }
    }
    // 使用value格式化的input值
    const getTextFromValue = (v: pickerValueInner) => (v ? v.format(formatText) : '')
    // 防抖改变focus状态（start ）
    const changeFocus = useDebounce((type: inputType | '') => {
        setFocusType(type)
    }, 50)
    // 设置value，并且设置text
    const setValueAndText = ([value0, value1]: rangPickerValueInner) => {
        setValue([value0, value1])
        setInputText([getTextFromValue(value0), getTextFromValue(value1)])
    }
    // 判断是否一致
    const judgeSame = (item1: pickerValueOutter, item2: pickerValueOutter | undefined) => {
        if (valueType === 'string') {
            return item1 === item2
        } else {
            return (item1 as Dayjs)?.format(formatText) === (item2 as Dayjs)?.format(formatText)
        }
    }
    // 修改Input状态
    const changeInputFocusStatus = (type: inputType, status: 'focus' | 'blur') => {
        const domObj = {
            start: startDom,
            end: endDom
        }
        domObj[type]?.current?.[status]()
    }
    // 根据focus状态修改样式
    const getInputBottomStyle = () => {
        if (!focusType) {
            return { opacity: 0 }
        } else {
            switch (focusType) {
                case 'start':
                    return { left: startDom.current?.offsetLeft, width: startDom.current?.clientWidth, opacity: 1 }
                case 'end':
                    return { left: endDom.current?.offsetLeft, width: endDom.current?.clientWidth, opacity: 1 }
                default:
                    return { opacity: 0 }
            }
        }
    }
    //
    const getWrapperDoms = () => {
        const res: wrapperProps = {}
        if (topDom) res.topDom = topDom({ close })
        if (bottomDom) res.bottomDom = bottomDom({ close })
        if (leftDom) res.leftDom = leftDom({ close })
        if (rightDom) res.rightDom = rightDom({ close })
        return res
    }
    // === utils === //

    // === flows === //
    // 工作流
    const [endFlow, setEndFlow] = useState<flowType[]>([])
    const [flow, setFlow] = useState<flowType[]>([])
    // 关闭工作流
    const closeFlow = () => {
        setFlow([])
    }
    // 新创建流
    const newFlow = (type: inputType) => {
        setFlow((flowObj[type] || []) as flowType[])
        setEndFlow([])
        changeInputFocusStatus(type, 'focus')
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
    // === flows === //

    // === values === //
    // date-picker的hover状态
    const [hover, setHover] = useState(false)
    // input的focus状态
    const [focusType, setFocusType] = useState<inputType | ''>('')
    // 窗口开关
    const [visible, setVisible] = useHalfControlled(outVisible, onVisibleChange, false, 'boolean')
    // 组件内部的value
    const [value, setValue] = useState<rangPickerValueInner>(handleToInner(defaultValue))
    // input的值
    const [inputText, setInputText] = useState<[string, string]>([getTextFromValue(value[0]), getTextFromValue(value[1])])
    //
    const textBeforeText = textBefore ? <span className={classnames('uik-rang-picker-text-before')}>{textBefore}</span> : ''
    // input的ref
    const rangPickerRef = useRef<HTMLLabelElement>(null)
    const startDom = useRef<HTMLInputElement>(null)
    const endDom = useRef<HTMLInputElement>(null)
    // 传入值的type类型
    const valueType = outValueType ? outValueType : typeof (outValue || defaultValue)[0] === 'string' ? 'string' : 'Dayjs'
    // clear显示
    const allowClearShow = !!(allowClear && !disabled && value[0] && value[1] && hover)
    const inputBottomStyle = getInputBottomStyle()
    // === values === //

    // === functions === //
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

    // 用于触发外界的onChange
    const onChange = (days: rangPickerValueInner) => {
        setValueAndText(days)
        if (outOnChange) {
            const newDays = handleToOutter(days)
            if (newDays.some((item, i) => !judgeSame(item, outValue?.[i]))) {
                outOnChange(newDays)
            }
        }
    }

    // 结速流程的标记，并关闭窗口
    const close = (days?: rangPickerValueInner) => {
        const theValue = days || value
        setVisible(false)

        changeInputFocusStatus('start', 'blur')
        changeInputFocusStatus('end', 'blur')

        if (step) {
            closeFlow()
        }

        // 结束流程触发onChange
        if (theValue[0] && theValue[1] && theValue[0].valueOf() < theValue[1].valueOf()) {
            onChange(theValue)
        } else {
            onChange([null, null])
        }
    }

    // 开启流程的标记
    const open = (type: inputType) => {
        setVisible(true)

        if (!step) {
            newFlow(type)
        }
    }

    // 日期点击事件
    const dateClick = (day: Dayjs) => {
        const newDay = dayToZero(day)
        if (step === 'start1' || step === 'end2') {
            setValueAndText([newDay, value[1]])
            if (step === 'start1') {
                changeInputFocusStatus('end', 'focus')
            }
            if (step === 'end2') {
                changeInputFocusStatus('start', 'blur')
            }
        }
        if (step === 'end1' || step === 'start2') {
            setValueAndText([value[0], newDay])
            if (step === 'end1') {
                changeInputFocusStatus('start', 'focus')
            }
            if (step === 'start2') {
                changeInputFocusStatus('end', 'blur')
            }
        }
    }

    // input的change事件
    const inputChange = (e: ChangeEvent<HTMLInputElement>, type: inputType) => {
        const v = e.target.value
        const inputDay = dayjs(v, [formatText, ...inputFormat], true)
        if (type === 'start') {
            if (inputDay.isValid()) {
                setValue([inputDay, value[1]])
            }
            setInputText([v, inputText[1]])
        }
        if (type === 'end') {
            if (inputDay.isValid()) {
                setValue([value[0], inputDay])
            }
            setInputText([inputText[0], v])
        }
    }

    // input的keydown事件
    const inputKeyDown = (e: KeyboardEvent<HTMLInputElement>, type: inputType) => {
        if (e.code === 'Enter') {
            if (type === 'start' && value[0]) {
                if (step === 'start1') {
                    changeInputFocusStatus('end', 'focus')
                }
                if (step === 'end2') {
                    changeInputFocusStatus('start', 'blur')
                }
            }
            if (type === 'end' && value[1]) {
                if (step === 'start2') {
                    changeInputFocusStatus('end', 'blur')
                }
                if (step === 'end1') {
                    changeInputFocusStatus('start', 'focus')
                }
            }
        }
    }

    // 清除
    const onClear = (e: MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        close([null, null])
    }

    // input blur 用于确认text是否正确
    const inputBlur = (type: inputType) => {
        changeFocus('')
        if (type === 'start') {
            const startText = getTextFromValue(value[0])
            if (startText !== inputText[0]) {
                setInputText([startText, inputText[1]])
            }
        }
        if (type === 'end') {
            const endText = getTextFromValue(value[1])
            if (endText !== inputText[1]) {
                setInputText([inputText[0], endText])
            }
        }
    }
    // === functions === //

    // === effects === //
    // 根据input的focus状态，修改流程
    useEffectAfterFirst(() => {
        const type = focusType
        if (type) {
            open(type)
            if ((step === 'start2' && type === 'start') || (step === 'end2' && type === 'end')) {
                returnBeforeStep()
            }
            if (step === 'start1' && type === 'end') {
                if (value[0]) {
                    toNextStep()
                } else {
                    newFlow(type)
                }
            }
            if (step === 'end1' && type === 'start') {
                if (value[1]) {
                    toNextStep()
                } else {
                    newFlow(type)
                }
            }
        } else {
            close()
        }
    }, [focusType])

    //
    useEffect(() => {
        if (!step && outValue) {
            setValueAndText(handleToInner(outValue))
        }
        // 如果因为外部原因导致visible没有关闭，则新建一个工作流
        if (!step && visible) {
            newFlow('start')
        }
    }, [step, outValue, visible])

    useLayoutEffect(() => {
        if (getRatePickerFuncs) {
            getRatePickerFuncs({
                close
            })
        }
    }, [getRatePickerFuncs])
    // === effects === //

    return (
        <RangPickerDropDown
            visible={visible}
            dateClick={dateClick}
            disabledDate={disabledDate}
            autoAdjust
            selectedDays={value}
            target={rangPickerRef.current}
            {...getWrapperDoms()}
            {...restProps}
        >
            <label
                ref={rangPickerRef}
                className={classnames('uik-rang-picker-input-wrapper', [`${size}`], { focus: visible, error, disabled })}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {textBeforeText}
                <input
                    ref={startDom}
                    size={htmlSize}
                    value={inputText[0]}
                    disabled={disabled}
                    placeholder={placeholder[0] || '开始日期'}
                    className={classnames('uik-rang-picker-input', [`${size}`])}
                    onBlur={() => inputBlur('start')}
                    onFocus={() => changeFocus('start')}
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
                    onBlur={() => inputBlur('end')}
                    onFocus={() => changeFocus('end')}
                    onChange={(e) => inputChange(e, 'end')}
                    onKeyDown={(e) => inputKeyDown(e, 'end')}
                />
                <span className="uik-rang-picker-input-bottom" style={inputBottomStyle} />
                <CloseIcon
                    defaultIconProps={{ name: 'date', size: 14, className: 'uik-rang-picker-icon' }}
                    circle
                    size={12}
                    onClick={onClear}
                    wrapperClassName={classnames('uik-rang-picker-close')}
                    visible={allowClearShow}
                />
            </label>
        </RangPickerDropDown>
    )
}

export default RangPicker
