import { CSSProperties } from 'react'

export type stickyProps = {
    offsetTop?: number
    offsetBottom?: number
    rootId?: string
    getRoot?: () => HTMLElement | null
    style?: CSSProperties
    className?: string
}
