import React, { FC, ForwardRefRenderFunction, useRef, forwardRef } from 'react'
import classnames from 'classnames'
import { iconProps, iconConfig, newIconConfig } from './types'
import './icon.less'

let _iconConfig: iconConfig = {
    fontFamily: '',
    classPrefix: '',
    url: ''
}

// 获取icon的css
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

// 配置icon
const config = (newConfig: newIconConfig): void => {
    _iconConfig = { ..._iconConfig, ...newConfig }
    if (newConfig.url) {
        getIconCss(newConfig.url)
    }
}

// icon 组件
const Icon: ForwardRefRenderFunction<unknown, iconProps> = (props, ref) => {
    const componentRef = useRef(null)
    const iconRef = (ref as any) || componentRef

    const { name = '', className, style = {}, uik = false, ...rest } = props
    const { fontFamily, classPrefix } = _iconConfig
    const iconStyle = { fontFamily: uik ? 'uik-iconfont' : fontFamily, ...style }

    return (
        <i
            ref={iconRef}
            className={classnames(`uik-iconfont ${uik ? 'uik-icon-' : classPrefix}${name}`, { [`${className}`]: className })}
            style={iconStyle}
            {...rest}
        />
    )
}

export { config }
export default forwardRef(Icon) as FC<iconProps>
