import { HTMLAttributes } from 'react'

/* eslint-disable no-unused-vars */
export type inputProps = {
    value?: string
    defaultValue?: string
    allowClear?: boolean
    disabled?: boolean
    maxLength?: number
    size?: uikSize
    onChange?: (v: string) => void
    onEnter?: (v: string) => void
    error?: boolean
} & HTMLAttributes<HTMLInputElement>
