import dayjs, { Dayjs } from 'dayjs'
import React, { FC, useState } from 'react'
import { DatePicker, Input } from 'uik'

const Test: FC = () => {
    const [v, setV] = useState<Dayjs | null>(dayjs())

    return (
        <>
            <div style={{ margin: 24 }}>
                <DatePicker onChange={setV} />
            </div>
        </>
    )
}

export default Test
