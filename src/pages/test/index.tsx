import dayjs, { Dayjs } from 'dayjs'
import React, { FC, useState } from 'react'
import { DatePicker, Input } from 'uik'

const Test: FC = () => {
    const [v, setV] = useState<Dayjs | null>(dayjs())

    const disabledDate = (day: Dayjs) => {
        
        return dayjs().valueOf() > day.valueOf() || dayjs().valueOf() < day.valueOf()
    }

    return (
        <>
            <div style={{ margin: 24 }}>
                <DatePicker value={v} onChange={setV} disabledDate={disabledDate} />
            </div>
        </>
    )
}

export default Test
