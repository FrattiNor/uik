/* eslint-disable no-unused-vars */
import { ReactElement } from 'react'

export type messageType = 'success' | 'error' | 'warn' | 'info' | 'default'
export type messagePosition = 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
export type messageTitle = string | ReactElement

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
    desc?: string | ReactElement
    width?: number
}

export type messageProps = {
    container: HTMLElement // 挂载点 容器
    div: HTMLDivElement // 完毕后卸载挂载点
    title: messageTitle
} & messagePropsAndOptions

export type messageOptions = {
    position?: messagePosition
} & messagePropsAndOptions

export type messageOpen = (title: messageTitle, options?: messageOptions) => void
