import React, { FC, useState } from 'react'
import { Progress, Slider } from 'uik'

const Test: FC = () => {
    const [percent, setPercent] = useState(60)

    const a = (v) => {
        console.log(v)
        setPercent(v)
    }

    return (
        <>
            <div style={{ margin: 24 }}>
                <Progress type="circle" percent={percent} />
            </div>
            <div style={{ margin: 24 }}>
                <Slider start={10} end={110} max={100} min={20} step={1} onChange={a} />
            </div>
        </>
    )
}

export default Test
