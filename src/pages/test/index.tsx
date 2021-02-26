import React, { FC } from 'react'
import { DatePicker } from 'uik'

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                <DatePicker value="2020-02-21" onChange={(v) => console.log(v)} />
            </div>
        </>
    )
}

export default Test
