import React, { FC } from 'react'
import classnames from 'classnames'
import { iconProps } from './types'
import './icon.less'

console.log('icon out')

const Icon: FC<iconProps> = ({ name, className, ...rest }) => {
    console.log('icon out')

    return <i className={classnames(`uik-iconfont icon-${name}`, { [`${className}`]: className })} {...rest} />
}

export default Icon
