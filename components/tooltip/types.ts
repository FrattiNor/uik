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

export type tooltipRenderProps = {
    position?: tooltipPosition
    title: string | JSX.Element
    visible?: boolean
    containerZIndex?: number // tooltip容器的zIndex，用于和其他悬浮内容比较层次（例如tooltip默认是在modal上方的，所以tooltip会显示在mask上方）【只能首次设置切不可更改，因为容器只会创造一次】
}

export type tooltipPoint = { x: number; y: number; width: number; height: number }

export type tooltipProps = tooltipRenderProps & {
    point: tooltipPoint
}
