import dayjs from 'dayjs'
import React, { FC } from 'react'
import { DatePicker } from 'uik'

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                <DatePicker value={dayjs()} />
            </div>
        </>
    )
}

export default Test
