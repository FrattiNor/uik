/* eslint-disable no-unused-vars */
import { HTMLAttributes, MouseEvent } from 'react'

export type iconProps = {
    name: string
    defaultIcon?: boolean
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
    danger?: boolean
    visible?: boolean
    size?: uikSize
    className?: string
    onClick?: (e: MouseEvent<HTMLElement>) => void
    defaultIconProps?: { name?: string; size?: uikSize; className?: string }
    wrapperClassName?: string
}
