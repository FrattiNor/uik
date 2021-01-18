import React, { FC } from 'react'
import { Button, message } from 'uik'

const Demo: FC = () => {
    const openMessage = () => message.open('This is a normal message')

    return <Button onClick={openMessage}>normal</Button>
}

export default Demo
