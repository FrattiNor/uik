import React, { FC } from 'react'
import { Button } from 'uik'
import './index.less'

const Demo: FC = () => {
    return (
        <div className="wrapper">
            <Button size="large">large</Button>
            <Button size="middle">middle</Button>
            <Button size="small">small</Button>
        </div>
    )
}

export default Demo
