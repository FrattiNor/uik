import { AllHTMLAttributes } from 'react'

export type iconProps = {
    name: string
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

export type loadingIconProps = AllHTMLAttributes<HTMLElement>

export type closeIconProps = AllHTMLAttributes<HTMLElement>
