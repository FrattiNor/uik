import React, { FC } from 'react'
import classnames from 'classnames'
import './index.css'

type props = {
    name: string
    className?: string
    [key: string]: any
}

const Icon: FC<props> = ({ name, className, ...rest }) => {
    return <i className={classnames(`iconfont2 icon-${name}`, { [`${className}`]: className })} {...rest} />
}

export default Icon
