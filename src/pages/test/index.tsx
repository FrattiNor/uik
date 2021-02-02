import React, { FC, useState } from 'react'
import { Progress, Slider, Input, message } from 'uik'

const Test: FC = () => {
    const [percent, setPercent] = useState(60)

    const a = (v) => {
        console.log(v)
        setPercent(v)
        message.open('aaa', { showClose: true })
    }

    return (
        <>
            <div style={{ margin: 24 }}>
                <div onClick={a}>66</div>
                <Input placeholder="input password" />
            </div>
        </>
    )
}

export default Test
