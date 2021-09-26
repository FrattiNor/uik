import { HTMLAttributes } from 'react'

export type stickyProps = {
    offsetTop?: number
    offsetBottom?: number
    rootId?: string
    getRoot?: () => HTMLElement | null | Document | Window
    rootParentId?: string
    getRootParent?: () => HTMLElement | null | Document | Window
} & HTMLAttributes<HTMLDivElement>
