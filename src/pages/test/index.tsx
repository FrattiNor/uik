import React, { FC, useState } from 'react'
import { Button, message } from 'uik'

const Test: FC = () => {
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState('primary')

    const onClick = () => {
        // setType(type === 'default' ? 'primary' : 'default')
        message.open('okkk', { type: 'success' })
        setLoading(!loading)
    }

    return (
        <div style={{ margin: 15 }}>
            <Button type={type} loading={loading} onClick={onClick}>
                ADD
            </Button>
        </div>
    )
}

export default Test
