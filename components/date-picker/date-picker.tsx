import React, { FC, useState, KeyboardEvent } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Input from '../input'
import DatePickerDropdown from './date-picker-dropdown'
import { datePickerProps } from './types'
import { useEffectAfterFirst, useStateFromValue } from '../_hooks'

dayjs.extend(customParseFormat)

const DatePicker: FC<datePickerProps> = (props) => {
    const [visible, setVisible] = useState(false)
    const { value: outValue, defaultValue, onChange, format: formatText = 'YYYY-MM-DD' } = props
    // 选中的 date dayjs对象
    const [virtualSelectedDay, setVirtualSelectedDay] = useState<Dayjs | null>(defaultValue || null)

    const selectedDay = outValue !== undefined ? outValue : virtualSelectedDay

    const showText = selectedDay ? selectedDay.format(formatText) : ''

    const [inputValue, setInputValue] = useStateFromValue(showText)

    const inputValueChange = (newV: string) => {
        setInputValue(newV)
        const inputValueDayJs = dayjs(newV, formatText, true)
        if (inputValueDayJs.isValid()) {
            setVirtualSelectedDay(inputValueDayJs)
        }
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }

    // const onVisibleChange = (v: boolean) => {
    //     setVisible(v)
    //     if (!v) {
    //         const inputValueDayJs = dayjs(inputValue, [formatText, 'YYYY-MM-DD', 'YYYY-MM-D', 'YYYY-M-DD', 'YYYY-M-D'], true)

    //         if (inputValueDayJs.isValid()) {
    //             setVirtualSelectedDay(inputValueDayJs)
    //         } else {
    //             setVirtualSelectedDay(null)
    //         }
    //     }
    // }

    useEffectAfterFirst(() => {
        if (onChange) onChange(virtualSelectedDay)
    }, [virtualSelectedDay])

    return (
        <DatePickerDropdown
            visible={visible}
            onVisibleChange={setVisible}
            autoAdjust
            selectedDay={selectedDay}
            onSelectedDayChange={(day: Dayjs) => setVirtualSelectedDay(day)}
            {...props}
        >
            <Input
                value={inputValue}
                onValueChange={inputValueChange}
                onClick={() => setVisible(true)}
                onKeyDown={onKeyDown}
                placeholder="请选择日期"
                allowClear
            />
        </DatePickerDropdown>
    )
}

export default DatePicker
