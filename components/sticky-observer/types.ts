import { HTMLAttributes } from 'react'

export type stickyProps = {
    offsetTop?: number
    offsetBottom?: number
    rootId?: string
    getRoot?: () => HTMLElement | null
} & HTMLAttributes<HTMLDivElement>
