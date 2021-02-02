import React, { FC, useState } from 'react'
import { Progress, Slider, Input, message, Switch,  Button } from 'uik'

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
                <Switch disabled />
            </div>
        </>
    )
}

export default Test
