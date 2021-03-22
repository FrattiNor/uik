import React, { FC, useState } from 'react'
import dayjs from 'dayjs'
import RangPicker from '../rang-picker'
import { rangPickerBoxProps, rangPickerValueInner, rangPickerFuncs } from './types'
import './index.less'

const RangPickerBox: FC<rangPickerBoxProps> = (props) => {
    const [func, setFunc] = useState<rangPickerFuncs | null>(null)
    const today = dayjs()
    const { close } = func || {}

    const changeValue = (v: rangPickerValueInner) => {
        if (close) close(v)
    }

    const rightDom = (
        <div className="uik-rang-picker-box-select">
            <span onClick={() => changeValue([today, today.month(today.month() + 3)])}>3个月</span>
            <span onClick={() => changeValue([today, today.month(today.month() + 6)])}>近半年</span>
            <span onClick={() => changeValue([today, today.year(today.year() + 1)])}>近一年</span>
        </div>
    )

    return <RangPicker {...props} getRatePickerFuncs={setFunc} rightDom={() => rightDom} />
}

export default RangPickerBox
