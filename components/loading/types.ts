import { AllHTMLAttributes } from 'react'

export type loadingProps = {
    loading?: boolean
    inline?: boolean
} & AllHTMLAttributes<HTMLDivElement>
