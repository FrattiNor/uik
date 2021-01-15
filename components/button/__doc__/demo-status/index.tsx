import React, { FC } from 'react'
import { Button } from 'uik'
import './index.less'

const Demo: FC = () => {
    return (
        <div className="wrapper">
            <Button loading>loading</Button>
            <Button disabled>disabled</Button>
        </div>
    )
}

export default Demo
