import { AllHTMLAttributes, CSSProperties } from 'react'

export type iconProps = {
    name: string
    className?: string
    style?: CSSProperties
    uik?: boolean
} & AllHTMLAttributes<HTMLElement>

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

export type loadingIconProps = {
    className?: string
} & AllHTMLAttributes<HTMLElement>

export type closeIconProps = {
    className?: string
} & AllHTMLAttributes<HTMLElement>
