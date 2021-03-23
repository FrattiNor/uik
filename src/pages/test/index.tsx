import React, { FC, useState } from 'react'
import { DatePicker } from 'uik'

const Test: FC = () => {
    const [value, setValue] = useState(['2020-11-12', '2020-12-12'])

    return (
        <>
            <div style={{ margin: 24 }}>
                <DatePicker.TimePicker allowClear visible />
            </div>
        </>
    )
}

export default Test
