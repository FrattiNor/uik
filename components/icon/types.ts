import { CSSProperties } from 'react'

export type iconProps = {
    name: string
    className?: string
    style?: CSSProperties
    uik?: boolean
    [key: string]: any // 其他属性
}

export type iconConfig = {
    fontFamily: string
    classPrefix: string
    url: string
}

export type newIconConfig = {
    fontFamily: string
    classPrefix: string
    url?: string
}