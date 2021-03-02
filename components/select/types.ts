/* eslint-disable no-unused-vars */
import { CSSProperties } from 'react'

export type selectProps = {
    value?: string | string[]
    defaultValue?: string | string[]
    onChange?: (v: string | string[]) => void
    multiple?: boolean
    allowClear?: boolean
    error?: boolean
    disabled?: boolean
    size?: uikSize
    virtualList?: boolean | number
    showCount?: number // 展开show的个数，在itemHeight为函数时，取第一个的高度算
    itemHeight?: number | (() => number) // option的高度，用于virtualList
    overlayHeight?: number // 展开的高度，优先级高于showCount，可用于不定itemHeight时设置展开高度
    width?: number
    visible?: boolean
    onVisibleChange?: (v: boolean) => void
}

export type selectDropdownProps = {
    options: any[]
    virtualList: boolean | number
    showCount: number
    itemHeight?: number | ((index: number) => number)
    overlayHeight?: number // 展开的高度，优先级高于showCount，可用于不定itemHeight时设置展开高度
}

export type optionProps = {
    value: string
    selected?: boolean
    itemClick?: (value: string, selected: boolean) => void
    isShow?: boolean
    className?: string
    style?: CSSProperties
    label?: JSX.Element | string | number // 需要show的内容，无则直接取children
}
