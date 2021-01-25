import { MouseEventHandler } from 'react'
import { buttonProps } from '../button/types'

export type confirmProps = {
    content: string | JSX.Element
    okBtnText?: string
    cancelBtnText?: string
    okBtnProps?: buttonProps
    cancelBtnProps?: buttonProps
    onConfrim?: MouseEventHandler<HTMLElement>
    onCancel?: MouseEventHandler<HTMLElement>
}
