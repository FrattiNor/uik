import dayjs, { Dayjs } from 'dayjs'
import React, { FC } from 'react'
import { DatePicker } from 'uik'

const { RangPicker, TimePicker } = DatePicker

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                {/* <RangPicker />
                <DatePicker disabledDate={(day: Dayjs | string) => (day as Dayjs).valueOf() > dayjs().valueOf()} /> */}
                <RangPicker allowClear />
            </div>
        </>
    )
}

export default Test
