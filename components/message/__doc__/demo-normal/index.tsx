import React, { FC } from 'react'
import { Button, message } from 'uik'

const Demo: FC = () => {
    const openMessage = () => message.open('这是一条普通message')

    return <Button onClick={openMessage}>普通提示</Button>
}

export default Demo
