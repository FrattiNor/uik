import React, { FC, useState } from 'react'
import { Progress, Slider, Input, message, Switch, Checkbox } from 'uik'

const Test: FC = () => {
    const [percent, setPercent] = useState(60)
    const [b, setB] = useState(false)

    const a = (v) => {
        console.log(v)
        setPercent(v)
        message.open('aaa', { showClose: true })
    }

    return (
        <>
            <div style={{ margin: 24 }}>
                <Input placeholder="请输入！" allowClear />
            </div>
        </>
    )
}

export default Test
