/* eslint-disable no-unused-vars */
import { HTMLAttributes } from 'react'

export type inputProps = {
    value?: string
    defaultValue?: string
    allowClear?: boolean
    disabled?: boolean
    maxLength?: number
    size?: uikSize
    htmlSize?: number
    onValueChange?: (v: string) => void
    onEnter?: (v: string) => void
    onClear?: (v: string) => void
    error?: boolean
    width?: number
} & HTMLAttributes<HTMLInputElement>
