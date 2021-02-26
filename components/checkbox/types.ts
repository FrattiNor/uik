/* eslint-disable no-unused-vars */
export type checkboxProps = {
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
    checkedHalf?: boolean
    className?: string
    value?: string
}

export type checkboxGroupProps = {
    disabled?: boolean
    checkedList?: string[]
    defaultCheckedList?: string []
    className?: string
    onChange?: (checkedList: string[]) => void
    onCheckedChange?: (checkedAll: boolean, checkedHalf: boolean) => void
}
