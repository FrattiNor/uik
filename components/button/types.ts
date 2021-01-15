/* eslint-disable no-unused-vars */
import { MouseEventHandler } from 'react'

export type buttonProps = {
    // shape?: 'circle' | 'round'
    className?: string
    disabled?: boolean
    loading?: boolean
    htmlType?: 'submit' | 'reset' | 'button'
    size?: 'large' | 'middle' | 'small'
    type?: 'primary' | 'danger' | 'default'
    onClick?: MouseEventHandler<HTMLButtonElement>
    [key: string]: any // button 其他属性
}

export type buttonLoadingProps = {
    visible: boolean
}