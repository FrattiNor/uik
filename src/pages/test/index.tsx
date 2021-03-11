import dayjs, { Dayjs } from 'dayjs'
import React, { FC } from 'react'
import { DatePicker } from 'uik'

const { RangPicker } = DatePicker

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                <RangPicker />
                <DatePicker disabledDate={(day: Dayjs | string) => (day as Dayjs).valueOf() > dayjs().valueOf()} />
            </div>
        </>
    )
}

export default Test
