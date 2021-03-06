/* eslint-disable no-unused-vars */
import { MouseEventHandler, HTMLAttributes } from 'react'

export type buttonType = 'primary' | 'danger' | 'default'

export type buttonProps = {
    // shape?: 'circle' | 'round'
    disabled?: boolean
    loading?: boolean
    htmlType?: 'submit' | 'reset' | 'button'
    size?: uikSize
    type?: buttonType
    onClick?: MouseEventHandler<HTMLButtonElement>
} & HTMLAttributes<HTMLButtonElement>

export type buttonLoadingProps = {
    visible: boolean
}
