import React, { FC, useState } from 'react'
import { DatePicker } from 'uik'

const Test: FC = () => {
    const [value, setValue] = useState(['2020-11-12', '2020-12-12'])

    return (
        <>
            <div style={{ margin: 24 }}>
                <DatePicker.RangPickerBox allowClear value={value} onChange={(v) => { console.log(v); setValue(v)}} />
            </div>
        </>
    )
}

export default Test
