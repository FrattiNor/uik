/* eslint-disable no-unused-vars */

export type messageType = 'success' | 'error' | 'warn' | 'info' | 'default'
export type messagePosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
export type messageContent = string | JSX.Element

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
    [key:string]: (animate?: boolean) => void
}

export type messageProps = {
    container: HTMLElement | null // 这个用来干掉container这个可以常驻
    father: Element | DocumentFragment // 这个是挂载点 要unmount卸载 完毕后卸载挂载点
    content: messageContent
    type?: messageType
    id?: string
}

export type messageOpen = (content: messageContent, options?: { type?: messageType; id?: string, position?: messagePosition }) => void
