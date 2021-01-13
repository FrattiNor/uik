import React, { FC, useState } from 'react'
import { Button, message } from 'uik'

message.config({
    position: ['top', 'center'],
    duration: 0,
    maxCount: 3
})

const Test: FC = () => {
    const [n, setN] = useState(0)

    const add = () => {
        message.open('This is a normal message ' + n, { type: 'success', id: n.toString() })
        setN(n + 1)
    }

    const destroy = () => {
        message.destroy()
    }

    return (
        <>
            <Button type="primary" onClick={add}>
                ADD
            </Button>
            <Button type="primary" onClick={destroy}>
                destroy
            </Button>
        </>
    )
}

export default Test
