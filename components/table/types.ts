/* eslint-disable no-unused-vars */
import { HTMLAttributes, ReactChildren } from 'react'

type columnsObj = {
    title: string
    dataIndex: string
    key: string
    align?: 'left' | 'right' | 'center'
    render?: (filed: any, thisLineData: anyObject, index: number) => ReactChildren
    width?: number | string
}

export type tableProps = {
    dataSource: any[]
    columns: columnsObj[]
    rowKey?: string
    bordered?: boolean
    scroll?: {
        x?: number | string
        y?: number | string
    }
} & HTMLAttributes<HTMLTableElement>
