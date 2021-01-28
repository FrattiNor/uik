import React, { FC } from 'react'
import { Sticky, Button } from 'uik'

const Demo: FC = () => {
    return (
        <Sticky offsetTop={0}>
            <Button type="primary">Sticky</Button>
        </Sticky>
    )
}

export default Demo
