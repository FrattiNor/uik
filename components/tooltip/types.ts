/* eslint-disable no-unused-vars */
export type tooltipPosition =
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

export type tooltipTrigger = 'hover' | 'focus' | 'click' 

export type tooltipRenderProps = {
    position?: tooltipPosition
    title: string | JSX.Element
    visible?: boolean
    containerZIndex?: number // tooltip容器的zIndex，用于和其他悬浮内容比较层次（例如tooltip默认是在modal上方的，所以tooltip会显示在mask上方）【只能首次设置切不可更改，因为容器只会创造一次】
    rootId?: string
    trigger?: tooltipTrigger // 默认的触发方式
    autoAdjust?: boolean // 自动调整位置 未实装
}

export type tooltipProps = tooltipRenderProps & {
    target: HTMLElement | null
    setVisible: (v: boolean) => void
}
