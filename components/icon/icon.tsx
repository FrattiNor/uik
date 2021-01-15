import React, { FC } from 'react'
import classnames from 'classnames'
import { iconProps } from './types'
import './icon.less'

// icon 组件
const Icon: FC<iconProps> = ({ name, className, ...rest }) => {
    return <i className={classnames(`uik-iconfont icon-${name}`, { [`${className}`]: className })} {...rest} />
}

export default Icon
