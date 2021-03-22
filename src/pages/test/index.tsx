import React, { FC } from 'react'
import {DatePicker} from 'uik'

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                <DatePicker.RangPicker allowClear />
            </div>
        </>
    )
}

export default Test
