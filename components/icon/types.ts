import { CSSProperties } from 'react'

export type iconProps = {
    name: string
    className?: string
    style?: CSSProperties
    [key: string]: any // 其他属性
}