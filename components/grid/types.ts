import { HTMLAttributes } from 'react'

export type gutter = number | [number, number]
export type align = 'top' | 'middle' | 'bottom'
export type justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'

export type rowProps = {
    spanAll?: number
    gutter?: gutter
    align?: align
    justify?: justify
    rowGap?: boolean
} & HTMLAttributes<HTMLDivElement>

export type colProps = {
    span: number
    leftSpan?: number
    rightSpan?: number
    gutter?: gutter
    spanAll?: number
    rowGap?: boolean
} & HTMLAttributes<HTMLDivElement>
