/* eslint-disable no-unused-vars */
import { CSSProperties, MouseEventHandler } from 'react'
import { buttonProps } from '../button/types'

type positionCenter = 'center' | ['center', { top?: number; width?: number; height?: number }]
type positionTop = 'top' | ['top', { height?: number }]
type positionBottom = 'bottom' | ['bottom', { height?: number }]
type positionLeft = 'left' | ['left', { width?: number }]
type positionRight = 'right' | ['right', { width?: number }]

export type modalPosition = positionCenter | positionTop | positionBottom | positionLeft | positionRight

export type modalProps = {
    position?: modalPosition
    visible?: boolean
    destroyOnClose?: boolean
    style?: CSSProperties
    title?: string | JSX.Element
    hiddenCloseIcon?: boolean
    head?: JSX.Element | null
    foot?: JSX.Element | null
    onCancel?: MouseEventHandler<HTMLElement>
    onOk?: MouseEventHandler<HTMLElement>
    mask?: boolean
    maskClosable?: boolean
    zIndex?: number // modal 和 modal 之间的层次关系
    cancelBtnProps?: buttonProps
    okBtnProps?: buttonProps
}
