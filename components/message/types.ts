import { ReactNode } from 'react'

export type messageType = 'success' | 'error' | 'warn' | 'info' | 'default'

export type messageContent = string | ReactNode

export type messageConfig = {
    position: ['top' | 'bottom', 'center' | 'left' | 'right']
    duration: number
    maxCount: number
}

export type messageProps = {
    container: HTMLElement | null // 这个用来干掉container这个可以常驻
    father: Element | DocumentFragment // 这个是挂载点 要unmount卸载 完毕后卸载挂载点
    content: string | ReactNode
    type?: messageType
    id?: string
}

export type messageDestroyFun = {
    [key:string]: () => void
}