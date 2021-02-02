import { HTMLAttributes } from 'react'

export type iconProps = {
    name: string
    uik?: boolean
} & HTMLAttributes<HTMLElement>

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

export type loadingIconProps = HTMLAttributes<HTMLElement>

export type closeIconProps = {
    circle?: boolean
    size?: uikSize
    danger?: boolean
} & HTMLAttributes<HTMLElement>
