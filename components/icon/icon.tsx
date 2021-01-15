import React, { FC } from 'react'
import classnames from 'classnames'
import { iconProps, iconConfig, newIconConfig } from './types'
import './icon.less'

let _iconConfig: iconConfig = {
    fontFamily: '',
    url: ''
}

// icon 组件
const Icon: FC<iconProps> = ({ name, className, style, ...rest }) => {
    const { fontFamily } = _iconConfig
    const iconStyle = { fontFamily, ...style }

    return <i className={classnames(`uik-iconfont icon-${name}`, { [`${className}`]: className })} style={iconStyle} {...rest} />
}

const getIconCss = (url: string): void => {
    const id = 'uik-icon-css'
    const style = document.getElementById(id)
    if (!style) {
        const newStyle = document.createElement('style')
        newStyle.setAttribute('id', id)
        newStyle.innerText = `@import url(${url});`
        document.head.append(newStyle)
    } else {
        style.innerText = `@import url(${url});`
    }
}

const config = (newConfig: newIconConfig): void => {
    _iconConfig = { ..._iconConfig, ...newConfig }
    if (newConfig.url) {
        getIconCss(newConfig.url)
    }
}

export { config }
export default Icon
