/* eslint-disable no-unused-vars */
import { HTMLAttributes } from "react"

export type checkboxProps = {
    checked?: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
} & HTMLAttributes<HTMLInputElement>