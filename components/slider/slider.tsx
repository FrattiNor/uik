import React, { FC, useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { sliderProps } from './types'
import { useEffectAfterFirst } from '../_hooks'
import Tooltip from '../tooltip'
import './slider.less'

// 获取 max min
const getTrueMaxMin = (start: number, end: number, max: number, min: number) => {
    const trueMax = max > end ? end : max < start ? start : max
    const trueMin = min > end ? end : min < start ? start : min > max ? max : min
    return { trueMax, trueMin }
}

// 根据 max min 获取 value
const getValueFromMaxMin = (value: number, start: number, end: number, max: number, min: number) => {
    const { trueMax, trueMin } = getTrueMaxMin(start, end, max, min)
    const trueValue = value > trueMax ? trueMax : value < trueMin ? trueMin : value

    return trueValue
}

const Slider: FC<sliderProps> = (props) => {
    const [tooltipVisible, setTooltipVisible] = useState(false)
    // props
    const { value, start = 0, end = 100, min = start, max = end, disabled = false, onChange, step } = props
    // 虚拟value
    const [virtualValue, setVirtualValue] = useState(value || start)
    // 如果不存在value则使用组件自己的虚拟value
    const _value = typeof value === 'number' ? value : virtualValue
    // 滑块本身
    const sliderRef = useRef<HTMLDivElement>(null)
    // 鼠标是否点下（-1为未点下）
    const [startX, setStartX] = useState(-1)
    // 滑块长度
    const length = end - start
    // max 和 min
    const { trueMax, trueMin } = getTrueMaxMin(start, end, max, min)
    // 从start到value的距离
    const trueValue = getValueFromMaxMin(_value, start, end, max, min) - start
    // 从start到value的比例
    const selectedPercent = trueValue / length
    // 从start到min
    const start2Min = trueMin - start
    // 从end到max
    const end2Max = end - trueMax
    // 选中条的样式
    const selectedLineStyle = {
        width: `${selectedPercent * 100}%`
    }
    // 选择点的样式
    const dotStyle = {
        left: `${selectedPercent * 100}%`
    }
    // min条的样式
    const minLineStyle = {
        width: `${(start2Min / length) * 100}%`
    }
    // max点的样式
    const maxLineStyle = {
        width: `${(end2Max / length) * 100}%`
    }
    // 实际change方法
    const trueOnchange = (v: number) => {
        // 根据 max min 设置值
        const newV = getValueFromMaxMin(v, start, end, max, min)
        // 取整2位小数
        const fixed2V = Number(newV.toFixed(2))
        if (onChange) onChange(fixed2V)
    }
    // 鼠标点下事件
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled) {
            setStartX(e.clientX)
        }
    }
    // 当鼠标点下时给 document 设置 鼠标松开和鼠标移动事件
    useEffect(() => {
        if (startX > 0 && !disabled) {
            const onMouseMove = (e: MouseEvent) => {
                // 滑块自身长度
                const allDistance = sliderRef.current !== null ? sliderRef.current.clientWidth : 1
                // 移动距离
                const distance = e.clientX - startX
                // 移动百分比
                const stepPercent = distance / allDistance
                // 移动的value
                const stepValue = stepPercent * length
                // 存在步长时，只有达到步长才触发change
                if (step) {
                    const stepValueFloor = stepValue > 0 ? Math.floor(stepValue / step) * step : Math.ceil(stepValue / step) * step
                    setVirtualValue(_value + stepValueFloor)
                } else {
                    setVirtualValue(_value + stepValue)
                }
            }

            const onMouseUp = () => {
                setStartX(-1)
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)

            return () => {
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }
        }
    }, [startX, disabled])

    // 组件触发改变会先改变 virtualValue，然后通过 virtualValue 改变 真实的 value
    useEffectAfterFirst(() => {
        trueOnchange(virtualValue)
    }, [virtualValue])

    return (
        <div className={classnames('uik-slider', { disabled: disabled })} ref={sliderRef}>
            <div className="uik-slider-line-bg" />
            <div className="uik-slider-line-selected" style={selectedLineStyle} />
            <div className="uik-slider-line-min" style={minLineStyle} />
            <div className="uik-slider-line-max" style={maxLineStyle} />
            <Tooltip title={`${virtualValue}`} visible={tooltipVisible || startX > 0} onVisibleChange={setTooltipVisible} visible>
                <div className="uik-slider-dot" style={dotStyle} onMouseDown={onMouseDown} />
            </Tooltip>
        </div>
    )
}

export default Slider
