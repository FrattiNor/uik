/* eslint-disable no-unused-vars */
import { CSSProperties, MouseEventHandler } from 'react'
import { buttonProps } from '../button/types'

export type modalProps = {
    top?: number
    width?: number
    visible?: boolean
    destroyOnClose?: boolean
    style?: CSSProperties
    title?: string | JSX.Element
    hiddenClose?: boolean
    head?: JSX.Element | null
    foot?: JSX.Element | null
    onCancel?: MouseEventHandler<HTMLElement>
    onOk?: MouseEventHandler<HTMLElement>
    mask?: boolean
    maskClosable?: boolean
    zIndex?: number
    cancelBtnProps?: buttonProps
    okBtnProps?: buttonProps
}
