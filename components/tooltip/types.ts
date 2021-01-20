export type tooltipRenderProps = {
    title?: string
    visible?: boolean
}

export type tooltipPosition = { x: number; y: number; width: number; height: number }

export type tooltipProps = tooltipRenderProps & {
    position: tooltipPosition
}
