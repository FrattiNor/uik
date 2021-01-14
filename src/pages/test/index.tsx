import React, { FC, useState } from 'react'
import { Button } from 'uik'

const Test: FC = () => {
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState('primary')

    const onClick = () => {
        // setType(type === 'default' ? 'primary' : 'default')
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
