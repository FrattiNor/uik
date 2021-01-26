/* eslint-disable no-unused-vars */

export type messageType = 'success' | 'error' | 'warn' | 'info' | 'default'
export type messagePosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
export type messageTitle = string | JSX.Element

export type messageConfig = {
    duration: number
    maxCount: number
    overAnimate: boolean
}

export type newMessageConfig = {
    duration?: number
    maxCount?: number
    overAnimate?: boolean
}

export type messageDestroyFun = {
    [key: string]: (animate?: boolean) => void
}

// props 和 options 共同的部分
export type messagePropsAndOptions = {
    type?: messageType
    id?: string
    duration?: number
    showClose?: boolean
    desc?: string | JSX.Element
    width?: number
}

export type messageProps = {
    container: HTMLElement | null // 这个用来干掉container这个可以常驻
    father: Element | DocumentFragment // 这个是挂载点 要unmount卸载 完毕后卸载挂载点
    title: messageTitle
} & messagePropsAndOptions

export type messageOptions = {
    position?: messagePosition
} & messagePropsAndOptions

export type messageOpen = (title: messageTitle, options?: messageOptions) => void
