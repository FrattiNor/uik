/* eslint-disable no-unused-vars */
export type sliderProps = {
    value?: number
    defaultValue?: number
    max?: number
    min?: number
    start?: number
    end?: number
    onChange?: (v: number) => void
    disabled?: boolean
    step?: number
    tooltipVisible?: boolean
    stepSmooth?: boolean
}
