import { AllHTMLAttributes } from 'react'

export type stickyProps = {
    offsetTop?: number
    offsetBottom?: number
    rootId?: string
    getRoot?: () => HTMLElement | null
} & AllHTMLAttributes<HTMLDivElement>
