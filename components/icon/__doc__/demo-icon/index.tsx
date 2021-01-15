import React, { FC } from 'react'
import { Icon } from 'uik'
import './index.less'

const Demo: FC = () => {
    return (
        <div className="wrapper">
            <Icon name="success" />
            <Icon name="error" />
            <Icon name="warn" />
            <Icon name="info" />
        </div>
    )
}

export default Demo
