import React, { FC, useEffect, useState, useRef } from 'react'
import classnames from 'classnames'
import { sliderProps } from './types'
import { useEffectAfterFirst } from '../_hooks'
import Tooltip from '../tooltip'
import './slider.less'

const Slider: FC<sliderProps> = (props) => {
    // props
    const {
        value: outValue,
        start = 0,
        end = 100,
        min: outMin = start,
        max: outMax = end,
        disabled = false,
        onChange: outOnchange,
        step,
        tooltip = true,
        stepSmooth = true
    } = props
    // 获取 max min
    const getTrueMaxMin = () => {
        const max = outMax > end ? end : outMax < start ? start : outMax
        const min = outMin > end ? end : outMin < start ? start : outMin > max ? max : outMin
        return { max, min }
    }
    const { max, min } = getTrueMaxMin()
    // 根据 max min 获取 value
    const getValueFromMaxMin = (v: number) => {
        const value = v > max ? max : v < min ? min : v
        return value
    }
    // 获取保留2位小数的value
    const getFixed2Value = (v: number) => {
        // 根据 max min 设置值
        const newV = getValueFromMaxMin(v)
        // 取整2位小数
        const fixed2V = Number(newV.toFixed(2))
        return fixed2V
    }
    // 滑块长度
    const length = end - start
    // 滑块本身
    const sliderRef = useRef<HTMLDivElement>(null)
    // tooltip visible
    const [tooltipVisible, setTooltipVisible] = useState(false)
    // 鼠标是否点下（-1为未点下）
    const [startX, setStartX] = useState(-1)
    // 虚拟value
    const [virtualValue, setVirtualValue] = useState(outValue || min)
    // step value
    const [valueByStep, setValueByStep] = useState(virtualValue)
    // tooltip 显示的 value，如果不存在 value 则使用组件自己的 step value
    const tooltipValue = typeof outValue === 'number' ? outValue : valueByStep
    // 实际组件的当前点位value，【如果开启step顺滑，点位按钮就不受控】
    const value = stepSmooth ? virtualValue : tooltipValue
    // 从start到value的距离
    const start2Value = getValueFromMaxMin(value) - start
    // 从start到value的比例
    const start2ValuePercent = start2Value / length
    // 从start到min
    const start2Min = min - start
    // 从end到max
    const end2Max = end - max
    // 选中条的样式
    const selectedLineStyle = {
        width: `${start2ValuePercent * 100}%`
    }
    // 选择点的样式
    const dotStyle = {
        left: `${start2ValuePercent * 100}%`
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
    const onchange = (v: number) => {
        if (outOnchange) outOnchange(v)
    }
    // 鼠标点下事件
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled) {
            setStartX(e.clientX)
        }
    }
    // 滑块点击
    const sliderLineClick = (e: React.MouseEvent) => {
        // 滑块自身
        const target = sliderRef.current !== null ? sliderRef.current.getBoundingClientRect() : { x: 0, width: 1 }
        // 鼠标
        const x = e.clientX
        const distance = x - target.x
        const percent = distance / target.width
        const stepValue = percent * length
        setVirtualValue(getFixed2Value(start + stepValue))
    }
    // 当鼠标点下时给 document 设置 鼠标松开和鼠标移动事件
    useEffect(() => {
        if (startX > -1 && !disabled) {
            const onMouseMove = (e: MouseEvent) => {
                // 滑块自身长度
                const targetDistance = sliderRef.current !== null ? sliderRef.current.clientWidth : 1
                // 移动距离
                const stepDistance = e.clientX - startX
                // 移动百分比
                const stepPercent = stepDistance / targetDistance
                // 移动的value
                const stepValue = stepPercent * length
                setVirtualValue(getFixed2Value(value + stepValue))
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

    // stepValue 改变 真实的 value
    useEffectAfterFirst(() => {
        if (step) {
            const stepValue = virtualValue - start
            const stepValueFloor = stepValue > 0 ? Math.floor(stepValue / step) * step : Math.ceil(stepValue / step) * step
            setValueByStep(stepValueFloor + start)
        } else {
            setValueByStep(virtualValue)
        }
    }, [virtualValue, step, start])

    useEffectAfterFirst(() => {
        onchange(valueByStep)
    }, [valueByStep])

    const dot = <div className={classnames('uik-slider-dot-content', { 'uik-slider-dot-mousedown': startX > -1 })} />

    return (
        <div className={classnames('uik-slider', { disabled: disabled })} ref={sliderRef}>
            <div className="uik-slider-line-bg" onClick={sliderLineClick} />
            <div className="uik-slider-line-selected" style={selectedLineStyle} onClick={sliderLineClick} />
            <div className="uik-slider-line-min" style={minLineStyle} />
            <div className="uik-slider-line-max" style={maxLineStyle} />
            <div className="uik-slider-dot" style={dotStyle} onMouseDown={onMouseDown}>
                {tooltip ? (
                    <Tooltip
                        title={`${tooltipValue}`}
                        visible={tooltipVisible || startX > 0}
                        onVisibleChange={setTooltipVisible}
                        updatePositionDepends={[value]}
                    >
                        {dot}
                    </Tooltip>
                ) : (
                    dot
                )}
            </div>
        </div>
    )
}

export default Slider
