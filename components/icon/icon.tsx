import React, { ForwardRefRenderFunction, useRef, forwardRef } from 'react'
import classnames from 'classnames'
import { iconProps } from './types'
import { _iconConfig } from './config'
import './iconfont.js'
import './icon.less'

// icon 组件
const Icon: ForwardRefRenderFunction<unknown, iconProps> = (props, ref) => {
    const componentRef = useRef<HTMLElement>(null)
    const iconRef = (ref as any) || componentRef

    const { name = '', className, defaultIcon = false, ...restProps } = props
    const { prefix } = _iconConfig
    const truePrefix = defaultIcon ? 'uik-icon-' : prefix

    return (
        <svg ref={iconRef} className={classnames(`uik-icon`, className)} aria-hidden="true" {...restProps}>
            <use xlinkHref={`#${truePrefix}${name}`}></use>
        </svg>
    )
}

export default forwardRef(Icon)
