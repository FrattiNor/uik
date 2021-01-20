import React, { FC, MouseEvent, useRef, forwardRef, ForwardRefRenderFunction } from 'react'
import classnames from 'classnames'
import ButtonLoading from './button_loading'
import { buttonProps } from './types'
import './button.less'

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

// 按钮
const Button: ForwardRefRenderFunction<unknown, buttonProps> = (props, ref) => {
    const { className = false, children, disabled = false, loading = false, htmlType = 'button', size = 'middle', type = 'default', onClick, ...rest } = props
    const componentRef = useRef(null)
    const btnRef = (ref as any) || componentRef

    // btn的class
    const getClassName = (): string => {
        const stateType = classList[type]
        const stateSize = classList[size]
        const stateLoading = loading && classList['loading']
        const stateDisabled = disabled && classList['disabled']

        return classnames('uik-btn', stateType, stateSize, stateLoading, stateDisabled, className)
    }

    // 获取点击坐标
    // 增加点击动画
    const getPosition = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        const target = btnRef.current
        if (target !== null) {
            const rect = target.getBoundingClientRect()
            const x = event.clientX - rect.x
            const y = event.clientY - rect.y
            const style = `width:10px;height:10px;left:${x - 5}px;top:${y - 5}px`

            const ballWrapper = document.createElement('div')
            ballWrapper.setAttribute('class', 'uik-btn-animate')

            const ball = document.createElement('div')
            ball.setAttribute('class', 'uik-btn-animate-ball')
            ball.setAttribute('style', style)
            ball.addEventListener('animationend', () => {
                target.removeChild(ballWrapper)
            })

            ballWrapper.append(ball)
            target.append(ballWrapper)
        }
    }

    // onClick 在 loading 和 disabled 状态 不能点击
    const onClickFun: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        if (!loading && !disabled) {
            getPosition(event)

            if (onClick) {
                onClick(event)
            }
        }
    }

    return (
        <button ref={btnRef} type={htmlType} className={getClassName()} onClick={onClickFun} {...rest}>
            <ButtonLoading visible={loading} />
            {children}
        </button>
    )
}

export default forwardRef(Button) as FC<buttonProps>
