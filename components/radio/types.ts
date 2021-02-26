/* eslint-disable no-unused-vars */
export type radioProps = {
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
    className?: string
    value?: string
}

export type radioGroupProps = {
    onChange?: (value: string) => void
    value?: string
    defaultValue?: string
    className?: string
    disabled?: boolean
}
