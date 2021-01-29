import React, { FC, useState } from 'react'
import { Progress, Button } from 'uik'

const Test: FC = () => {
    const [precent, setPrecent] = useState(50)

    const add = () => {
        setPrecent(precent + 10)
    }

    const del = () => {
        setPrecent(precent - 10)
    }

    return (
        <>
            <div style={{ margin: 24 }}>
                <Progress type='circle' percent={precent} />
            </div>
            <Button onClick={add}>add</Button>
            <Button onClick={del}>del</Button>
        </>
    )
}

export default Test
