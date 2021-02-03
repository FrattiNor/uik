/* eslint-disable no-unused-vars */
import { HTMLAttributes } from 'react'

export type switchProps = {
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    onChange?: (c: boolean) => void
} & HTMLAttributes<HTMLButtonElement>
