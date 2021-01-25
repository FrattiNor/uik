import { FC } from 'react'

/* eslint-disable no-unused-vars */
export type noticePosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'leftTop'
    | 'leftCenter'
    | 'leftBottom'
    | 'rightTop'
    | 'rightCenter'
    | 'rightBottom'

export type noticeTrigger = 'hover' | 'focus' | 'click'

// == noticeRenderHoc ==
export type noticeRenderProps = {
    position?: noticePosition
    visible?: boolean
    containerZIndex?: number // notice容器的zIndex，用于和其他悬浮内容比较层次（例如tooltip默认是在modal上方的，所以tooltip会显示在mask上方）【只能首次设置切不可更改，因为容器只会创造一次】
    rootId?: string
    trigger?: noticeTrigger // 默认的触发方式
    autoAdjust?: boolean
    disabled?: boolean
    onVisibleChange?: (v: boolean) => void
}

export type noticeRenderHocProps = {
    Component: FC<noticeProps>
    name: string
    defaultTrigger: noticeTrigger
}

export type noticeRenderHocComponent = (props: noticeRenderHocProps) => FC<noticeRenderProps>
// == noticeRenderHoc ==

// == noticeHoc ==
export type noticeProps = noticeRenderProps & {
    target: HTMLElement | null
    containerId: string
    setVirtualVisible: (v: boolean) => void
}

export type noticeHocProps = {
    backgroundColor: string
    emptyKey?: string
}

export type noticeHocComponent = (props: noticeHocProps) => noticeHocInnerComponent

// any 代表组件本身的props参数
export type noticeHocInnerComponent = (WrapperComponent: FC<any>) => FC<noticeProps & any>
// == noticeHoc ==

// == back FC ==
export type noticeBackFC<T> = FC<T & noticeRenderProps>
