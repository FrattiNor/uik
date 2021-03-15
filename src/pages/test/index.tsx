import dayjs, { Dayjs } from 'dayjs'
import React, { FC, useState } from 'react'
import { DatePicker } from 'uik'

const { RangPicker } = DatePicker

const Test: FC = () => {
    const [a, setA] = useState([dayjs(), dayjs().month(dayjs().month() + 1)])

    return (
        <>
            <div style={{ margin: 24 }}>
                {/* <RangPicker />
                <DatePicker disabledDate={(day: Dayjs | string) => (day as Dayjs).valueOf() > dayjs().valueOf()} /> */}
                <RangPicker
                    value={a}
                    onChange={(v) => {
                        console.log('v', v)
                        setA(v)
                    }}
                    allowClear
                />
            </div>
        </>
    )
}

export default Test
