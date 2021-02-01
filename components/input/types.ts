import { AllHTMLAttributes } from 'react'

/* eslint-disable no-unused-vars */
export type inputProps = {
    value?: string
    allowClear?: boolean
    disabled?: boolean
    maxLength?: number
    size?: uikSize
    onChange?: (v: string) => void
    onEnter?: (v: string) => void
    className?: string
} & AllHTMLAttributes<HTMLInputElement>
