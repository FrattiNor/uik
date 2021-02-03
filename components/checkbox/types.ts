/* eslint-disable no-unused-vars */
export type checkboxProps = {
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
    checkedHalf?: boolean
    className?: string
}

export type checkboxGroupOption = {
    value: string
    label: string
    disabled?: boolean
}

export type checkboxGroupProps = {
    disabled?: boolean
    options?: string[] | checkboxGroupOption[]
    checkedList?: string[]
    defaultCheckedList?: string[]
    onChange?: (checkedList: string[]) => void
    className?: string
}
