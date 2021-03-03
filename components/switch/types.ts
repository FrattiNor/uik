/* eslint-disable no-unused-vars */
import { HTMLAttributes } from 'react'

export type switchProps = {
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    onCheckedChange?: (c: boolean) => void
} & HTMLAttributes<HTMLButtonElement>
