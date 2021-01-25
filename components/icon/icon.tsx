import React, { FC, ForwardRefRenderFunction, useRef, forwardRef } from 'react'
import classnames from 'classnames'
import { iconProps } from './types'
import { _iconConfig } from './config'
import './icon.less'

// icon 组件
const Icon: ForwardRefRenderFunction<unknown, iconProps> = (props, ref) => {
    const componentRef = useRef(null)
    const iconRef = (ref as any) || componentRef

    const { name = '', className, style = {}, uik = false, ...rest } = props
    const { fontFamily, classPrefix } = _iconConfig
    const trueFontFamily = uik ? 'uik-iconfont' : fontFamily
    const trueClassPrefix = uik ? 'uik-icon-' : classPrefix
    const iconStyle = { fontFamily: trueFontFamily, ...style }

    return (
        <i
            ref={iconRef}
            className={classnames(`uik-iconfont ${trueClassPrefix}${name}`, { [`${className}`]: className })}
            style={iconStyle}
            {...rest}
        />
    )
}

export default forwardRef(Icon) as FC<iconProps>
