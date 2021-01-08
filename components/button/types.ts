import { MouseEventHandler } from 'react'

export type buttonProps = {
    className?: string
    disabled?: boolean
    loading?: boolean
    htmlType?: 'submit' | 'reset' | 'button'
    shape?: 'circle' | 'round'
    size?: 'large' | 'middle' | 'small'
    type?: 'primary' | 'danger' | 'default'
    onClick?: MouseEventHandler<HTMLButtonElement>
}