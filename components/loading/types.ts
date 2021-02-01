import { AllHTMLAttributes } from 'react'

export type loadingProps = {
    className?: string
    loading?: boolean
    inline?: boolean
} & AllHTMLAttributes<HTMLDivElement>
