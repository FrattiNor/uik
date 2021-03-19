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

// =============== notice-props notice-render-props 共同的参数 ===============

export type noticeAndRenderProps = {
    position?: noticePosition
    visible?: boolean
    trigger?: noticeTrigger // 默认的触发方式
    autoAdjust?: boolean
    popSameWidth?: boolean // 弹出层和触发元素一样宽，用于dropdown
    overlayStyle?: CSSProperties | ((style: CSSProperties) => CSSProperties) // 弹出层的样式
    overlayClass?: string // 弹出层的样式
    updatePositionDepends?: any[] // 会触发重新获取定位的props参数
}

// =============== noticeHoc ===============

// notice 组件参数
export type noticeProps = {
    target: HTMLElement | null
    container: HTMLElement | null
    root: HTMLElement | null
    setVirtualVisible: (v: boolean) => void
} & noticeAndRenderProps

// any 代表组件本身的props参数
// notice-hoc-inner 高阶组件本身
export type noticeHocInner<T> = (WrapperComponent: FC<noticeProps & T>) => FC<noticeProps & T>

// =============== noticeRenderHoc ===============

// render 组件参数 【对外使用的参数】
export type noticeRenderProps = {
    containerZIndex?: number // notice容器的zIndex，用于和其他悬浮内容比较层次（例如tooltip默认是在modal上方的，所以tooltip会显示在mask上方）【只能首次设置切不可更改，因为容器只会创造一次】
    rootId?: string
    getRoot?: () => HTMLElement | null
    disabled?: boolean
    onVisibleChange?: (v: boolean) => void
} & noticeAndRenderProps

// notice-hoc-inner 高阶组件本身
export type noticeRenderHocInner<T> = (WrapperComponent: FC<noticeProps & T>) => FC<noticeRenderProps & T>

// === 配置参数 ===

// notice-hoc 配置参数
export type noticeHocProps = {
    backgroundColor: string // 背景色
    emptyKey?: string // 判空props，props[emptyKey]
    needArrow?: boolean // 需要箭头
    defaultPosition?: noticePosition // 默认定位
    isDropdown?: boolean // 是否是dropdwon（代表从一边展开），触发的动画不同
    updatePositionProps?: string[] // 会触发重新获取定位的props参数
    emptyClickClose?: boolean // 控制点击外部空白区域关闭【click默认是有的】
}

// render-render-hoc 配置参数
export type noticeRenderHocProps = {
    name: string // name 创建指定容器使用
    defaultZIndex: number // 默认zindex
    defaultTrigger?: noticeTrigger // 默认触发方式
}
