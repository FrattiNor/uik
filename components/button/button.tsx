import React, { FC } from 'react'
import classnames from 'classnames'
import Loading from '../loading'
import { buttonProps } from './types'
import './button.less'

console.log('button out')
const Button: FC<buttonProps> = (props) => {
    console.log('button in')
    const { LoadingIcon } = Loading
    const { className = false, children, disabled = false, loading = false, htmlType = 'button', size = 'middle', type = 'default', onClick } = props

    // 多种状态可以重叠
    const classList = {
        // 状态 type
        primary: 'uik-btn-primary',
        danger: 'uik-btn-danger',
        default: 'uik-btn-default',
        // 状态 disabled
        disabled: 'uik-btn-disabled',
        // 状态 loading
        loading: 'uik-btn-loading',
        // 状态 size
        large: 'uik-btn-large',
        middle: 'uik-btn-middle',
        small: 'uik-btn-small'
    }

    const getClassName = (): string => {
        const stateType = classList[type]
        const stateSize = classList[size]
        const stateLoading = loading && classList['loading']
        const stateDisabled = disabled && classList['disabled']

        return classnames('uik-btn', stateType, stateSize, stateLoading, stateDisabled, className)
    }

    return (
        <button type={htmlType} className={getClassName()} onClick={onClick}>
            {loading && <LoadingIcon className="uik-btn-loading-icon" />}
            {children}
        </button>
    )
}

export default Button
