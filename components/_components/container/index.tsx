import React, { FC } from 'react'
import { containerProps } from './types'
import './index.less'

const Container: FC<containerProps> = ({ id }) => {
    return (
        <div className="uik-container">
            <div id={id} />
        </div>
    )
}

export default Container
