/* eslint-disable no-unused-vars */
import { CSSProperties, HTMLAttributes, MouseEvent } from 'react'

export type iconProps = {
    name: string
    defaultIcon?: boolean
} & HTMLAttributes<HTMLOrSVGElement>

export type iconConfig = {
    prefix: string
    url: string
}

export type newIconConfig = {
    prefix: string
    url?: string
}

export type loadingIconProps = HTMLAttributes<HTMLElement>

export type closeIconProps = {
    circle?: boolean
    danger?: boolean
    visible?: boolean
    size?: number
    className?: string
    style?: CSSProperties
    onClick?: (e: MouseEvent<HTMLElement>) => void
    defaultIconProps?: { name?: string; size?: number; className?: string; style?: CSSProperties }
    wrapperClassName?: string
    wrapperStyle?: CSSProperties
}
