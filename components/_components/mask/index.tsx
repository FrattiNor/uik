import React, { FC } from 'react'
import { maskProps } from './types'
import './index.less'

const Container: FC<maskProps> = ({ id }) => {
    return (
        <div className="uik-container">
            <div id={id} />
        </div>
    )
}

export default Container
