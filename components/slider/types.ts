/* eslint-disable no-unused-vars */
export type sliderProps = {
    value?: number
    max?: number
    min?: number
    start?: number
    end?: number
    onChange?: (v: number) => void
    disabled?: boolean
    step?: number
    tooltip?: boolean
    stepSmooth?: boolean
}
