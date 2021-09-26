import React, { FC, useEffect, useRef, useState } from 'react'
import { tableProps } from './types'
import classnames from 'classnames'
import './table.less'

const Table: FC<tableProps> = (props) => {
    const bodyRef = useRef<HTMLTableSectionElement>(null)
    const containerRef = useRef<HTMLTableSectionElement>(null)
    const { dataSource = [], columns = [], rowKey = 'id', bordered = false, scroll, style = {}, className, ...rest } = props
    const { x = '100%', y = '100%' } = scroll || {}
    const [bodyWidth, setBodyWidth] = useState<number[]>([])

    const colGroup = (
        <colgroup>
            {columns.map(({ width, key }, i) => (
                <col style={{ width: width || bodyWidth[i] }} key={key} />
            ))}
        </colgroup>
    )

    useEffect(() => {
        if (bodyRef.current) {
            const bodyLineOne = bodyRef.current?.childNodes?.[0]?.childNodes
            if (bodyLineOne?.length > 0) {
                const newBodyWidth: number[] = []
                bodyLineOne.forEach((item, i) => {
                    newBodyWidth[i] = (item as HTMLElement).offsetWidth
                })
                setBodyWidth(newBodyWidth)
            }
        }
    }, [dataSource])

    return (
        <div className={classnames('uik-table-outer', className)} style={{ maxWidth: x, maxHeight: y, ...style }} {...rest} ref={containerRef}>
            <div className="uik-table-outer-head">
                <table className={classnames('uik-table')}>
                    {colGroup}
                    <thead className={classnames('uik-table-head')}>
                        <tr className={classnames('uik-table-head-tr')}>
                            {columns.map(({ title }) => (
                                <th className={classnames('uik-table-head-th', { bordered })} key={title}>
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="uik-table-outer-body">
                <table className={classnames('uik-table')}>
                    {colGroup}
                    <tbody className={classnames('uik-table-body')} ref={bodyRef}>
                        {dataSource.map((item, i) => (
                            <tr key={item[rowKey] ?? i} className={classnames('uik-table-body-tr')}>
                                {columns.map(({ dataIndex, key, render }) => (
                                    <td className={classnames('uik-table-body-td', { bordered })} key={key}>
                                        {typeof render === 'function' ? render(item[dataIndex], item, i) : item[dataIndex]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
