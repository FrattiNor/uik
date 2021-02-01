import React, { FC, useState } from 'react'
import { Progress, Slider, Input } from 'uik'

const Test: FC = () => {
    const [percent, setPercent] = useState(60)

    const a = (v) => {
        console.log(v)
        setPercent(v)
    }

    return (
        <>
            <div style={{ margin: 24 }}>
                <Input />
            </div>
        </>
    )
}

export default Test
