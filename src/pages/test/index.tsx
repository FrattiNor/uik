import React, { FC, useState } from 'react'
import { Button, message } from 'uik'

message.config({
    position: ['top', 'center'],
    duration: 0,
    maxCount: 3
})

const Test: FC = () => {
    const [n, setN] = useState(0)

    const click = () => {
        message.success('This is a normal message ' + n)
        setN(n + 1)
    }

    return (
        <>
            <Button type="primary" onClick={click}>
                Button
            </Button>
        </>
    )
}

export default Test
