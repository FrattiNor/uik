import { HTMLAttributes } from 'react'

export type loadingProps = {
    loading?: boolean
    inline?: boolean
} & HTMLAttributes<HTMLDivElement>
