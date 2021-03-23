import React, { FC } from 'react'
import TimeSelect from '../select/time-select'
import { timePickerDropdownProps } from './types'
import DropdownBox from '../dropdown-box'
import './time-picker-dropdown.less'

const TimePickerDropdown: FC<timePickerDropdownProps> = (props) => {
    // 使用 setVirtualVisible 关闭， 外部使用 onVisibleChange 监听
    const { selectedValue, timeClick, disabledDate, ...restProps } = props

    const hour = selectedValue ? selectedValue.hour() : 0
    const minute = selectedValue ? selectedValue.minute() : 0
    const second = selectedValue ? selectedValue.second() : 0

    const centerDom = (
        <>
            <div className="uik-time-picker-content">
                <TimeSelect disabledDate={disabledDate} hour={hour} minute={minute} second={second} onClick={timeClick} />
            </div>
        </>
    )

    return <DropdownBox {...restProps} centerDom={centerDom} />
}

export default TimePickerDropdown
