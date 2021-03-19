import React, { ForwardRefRenderFunction, useRef, forwardRef, useEffect } from 'react'
import classnames from 'classnames'
import { iconProps } from './types'
import { setIconJS } from './util'
import { _iconConfig } from './config'
import './icon.less'

// icon 组件
const Icon: ForwardRefRenderFunction<unknown, iconProps> = (props, ref) => {
    const componentRef = useRef<HTMLElement>(null)
    const iconRef = (ref as any) || componentRef

    const { name = '', className, defaultIcon = false, ...restProps } = props
    const { prefix } = _iconConfig
    const truePrefix = defaultIcon ? 'uik-icon-' : prefix

    useEffect(() => {
        setIconJS('https://at.alicdn.com/t/font_2300539_q0cmvuvm7fg.js', 'uik-icon-default-js')
    }, [])

    return (
        <svg ref={iconRef} className={classnames(`uik-icon`, className)} aria-hidden="true" {...restProps}>
            <use xlinkHref={`#${truePrefix}${name}`}></use>
        </svg>
    )
}

export default forwardRef(Icon)
