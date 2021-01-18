import React, { FC, useState, Fragment, MouseEvent } from 'react'
import classnames from 'classnames'
import Button from '../button'
import Icon from '../icon'
import { useEffectTimeout } from '../_hooks'
import { modalProps } from './types'
import './modal.less'

// 组件
const Modal: FC<modalProps> = (props) => {
    const {
        destroyOnClose = false,
        visible = false,
        top = 150,
        width = 500,
        children,
        onCancel,
        onOk,
        style = {},
        title = '',
        hiddenClose = false,
        head,
        foot,
        mask = true,
        maskClosable = true,
        zIndex = 1,
        cancelBtnProps = {},
        okBtnProps = {}
    } = props

    const [show, setShow] = useState(true)
    const [classname, setClassname] = useState('show')

    const modalStyle = { width, top, left: `calc(50% - ${width / 2}px)`, zIndex, ...style }

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
                setClassname('show')
                setShow(true)
            } else {
                setClassname('hidden')
                connect(
                    setTimeout(() => {
                        setShow(false)
                    }, 350)
                )
            }
        },
        [visible]
    )

    const DOM = (
        <div style={{ display: show ? 'block' : 'none' }}>
            {mask && <div className={classnames('uik-modal-mask', classname)} onClick={(e) => maskClosable && trueCancel(e)} />}
            <div className={classnames('uik-modal', classname)} style={modalStyle}>
                {head !== undefined ? (
                    head
                ) : (
                    <div className="uik-modal-head">
                        <span>{title}</span>
                        {!hiddenClose && <Icon uik name="close" className="uik-modal-head-close" onClick={trueCancel} />}
                    </div>
                )}
                <div className="uik-modal-content">{children}</div>
                {foot !== undefined ? (
                    foot
                ) : (
                    <div className="uik-modal-foot">
                        <Button onClick={trueCancel} {...cancelBtnProps}>
                            取消
                        </Button>
                        <Button type="primary" onClick={trueOk} {...okBtnProps}>
                            确认
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )

    return <Fragment>{destroyOnClose ? show && DOM : DOM}</Fragment>
}

export default Modal
