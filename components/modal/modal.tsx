import React, { FC, useState, Fragment, MouseEvent, CSSProperties } from 'react'
import classnames from 'classnames'
import Button from '../button'
import Icon from '../icon'
import { useEffectTimeout } from '../_hooks'
import { setBodyScroll } from '../_utils'
import { modalProps, modalPosition } from './types'
import './modal.less'

// 获取model的样式
const getModalStyle = (position: modalPosition, baseStyle: CSSProperties) => {
    const type = Array.isArray(position) ? position[0] : position
    const positionOptions: anyObject = Array.isArray(position) ? position[1] : {}

    switch (type) {
        case 'center': {
            const { width = 500, height, top = 150 } = positionOptions
            return { width, height, top, left: `calc(50% - ${width / 2}px)`, ...baseStyle }
        }
        case 'top': {
            const { height } = positionOptions
            return { width: '100vw', height, top: 0, left: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, ...baseStyle }
        }
        case 'bottom': {
            const { height } = positionOptions
            return { width: '100vw', height, bottom: 0, left: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, ...baseStyle }
        }
        case 'left': {
            const { width = 500 } = positionOptions
            return { width, height: '100vh', top: 0, left: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, ...baseStyle }
        }
        case 'right': {
            const { width = 500 } = positionOptions
            return { width, height: '100vh', top: 0, right: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0, ...baseStyle }
        }
        default:
            return {}
    }
}

// 组件
const Modal: FC<modalProps> = (props) => {
    const { CloseIcon } = Icon
    const {
        position = 'center',
        destroyOnClose = false,
        visible = false,
        children,
        style = {},
        title = '',
        hiddenCloseIcon = false,
        head,
        foot,
        mask = true,
        maskClosable = true,
        zIndex,
        onOk,
        onCancel,
        okBtnProps = {},
        cancelBtnProps = {},
        okBtnText,
        cancelBtnText
    } = props

    const type = Array.isArray(position) ? position[0] : position
    const baseStyle = zIndex ? { zIndex, ...style } : style

    const [show, setShow] = useState(!!visible)
    const [animateClassname, setAnimateClassname] = useState(visible ? 'show' : 'hidden')

    const trueCancel = (e: MouseEvent<HTMLElement>) => {
        if (onCancel) {
            onCancel(e)
        }
    }

    const trueOk = (e: MouseEvent<HTMLElement>) => {
        if (onOk) {
            onOk(e)
        }
    }

    useEffectTimeout(
        (connect) => {
            if (visible) {
                setAnimateClassname('show')
                setShow(true)
                setBodyScroll(false)
            } else {
                setAnimateClassname('hidden')
                setBodyScroll(true)
                connect(
                    setTimeout(() => {
                        setShow(false)
                        setAnimateClassname('')
                    }, 350)
                )
            }
        },
        [visible]
    )

    const DOM = (
        <div style={{ display: show ? 'block' : 'none' }}>
            {mask && <div className={classnames('uik-modal-mask', animateClassname)} onClick={(e) => maskClosable && trueCancel(e)} />}
            <div className={classnames('uik-modal', type, animateClassname)} style={getModalStyle(position, baseStyle)}>
                {head !== undefined ? (
                    head
                ) : (
                    <div className="uik-modal-head">
                        <span>{title}</span>
                        {!hiddenCloseIcon && <CloseIcon circle danger size={18} onClick={trueCancel} />}
                    </div>
                )}
                <div className="uik-modal-content">{children}</div>
                {foot !== undefined ? (
                    foot
                ) : (
                    <div className="uik-modal-foot">
                        <Button onClick={trueCancel} {...cancelBtnProps}>
                            {cancelBtnText || '取消'}
                        </Button>
                        <Button type="primary" onClick={trueOk} {...okBtnProps}>
                            {okBtnText || '确认'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )

    return <Fragment>{destroyOnClose ? show && DOM : DOM}</Fragment>
}

export default Modal
