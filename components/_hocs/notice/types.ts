/* eslint-disable no-unused-vars */
import { CSSProperties, FC } from 'react'

// 定位
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

// 触发方式
export type noticeTrigger = 'hover' | 'focus' | 'click'

// notice-props notice-render-props 共同的参数
export type noticeAndRenderProps = {
    position?: noticePosition
    visible?: boolean
    trigger?: noticeTrigger // 默认的触发方式
    autoAdjust?: boolean
    popSameWidth?: boolean // 弹出层和触发元素一样宽，用于dropdown
    overlayStyle?: CSSProperties | ((style: CSSProperties) => CSSProperties) // 弹出层的样式
    overlayClass?: string // 弹出层的样式
}

// == noticeRenderHoc ==
// render-hoc 配置参数
export type noticeRenderHocProps = {
    Component: FC<noticeProps>
    name: string
    defaultTrigger: noticeTrigger
}

// render 组件参数
export type noticeRenderProps = {
    containerZIndex?: number // notice容器的zIndex，用于和其他悬浮内容比较层次（例如tooltip默认是在modal上方的，所以tooltip会显示在mask上方）【只能首次设置切不可更改，因为容器只会创造一次】
    rootId?: string
    getRoot?: () => HTMLElement | null
    disabled?: boolean
    onVisibleChange?: (v: boolean) => void
} & noticeAndRenderProps

// render-hoc 高阶组件本身
export type noticeRenderHocComponent = (props: noticeRenderHocProps) => FC<noticeRenderProps>


// == noticeHoc ==

// notice-hoc 配置参数
export type noticeHocProps = {
    backgroundColor: string
    emptyKey?: string
    needArrow?: boolean
    defaultPosition?: noticePosition,
    isDropdown?: boolean // 是否是dropdwon，触发的动画不同
    getPositionProps?: string[] // 会触发重新获取定位的props参数
}

// notice 组件参数
export type noticeProps = {
    target: HTMLElement | null
    container: HTMLElement | null
    root: HTMLElement | null
    setVirtualVisible: (v: boolean) => void
} & noticeAndRenderProps

// notice-hoc 高阶组件本身
export type noticeHocComponent = (props: noticeHocProps) => noticeHocInnerComponent

// any 代表组件本身的props参数
// notice-hoc-inner 高阶组件本身
export type noticeHocInnerComponent = (WrapperComponent: FC<any>) => FC<noticeProps & any>


// == back FC ==
// 返回的组件
export type noticeBackFC<T> = FC<T & noticeRenderProps>
