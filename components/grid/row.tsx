import React, { cloneElement, FC, isValidElement } from 'react'
import Col from './col'
import classnames from 'classnames'
import { rowProps } from './types'
import { alignObj, justifyObj, getGutter } from './util'
import './row.less'

const Row: FC<rowProps> = (props) => {
    const { children, spanAll = 24, gutter, align = 'top', justify = 'start', className, style = {}, rowGap = true, ...rest } = props
    const child = Array.isArray(children) ? children : [children]
    const content = child
        .map((item, i) =>
            isValidElement(item) && item.type === Col
                ? cloneElement(item, { spanAll: item.props.spanAll || spanAll, gutter: item.props.gutter || gutter, key: i, rowGap })
                : ''
        )
        .filter((item) => item)

    const [gutterWidth, gutterHeight] = getGutter(gutter)

    const marginStyle = rowGap
        ? {
            margin: `0 -${gutterWidth / 2}px`,
            rowGap: `${gutterHeight}px`
        }
        : {
            margin: `-${gutterHeight / 2}px -${gutterWidth / 2}px`,
            // rowGap: `${gutterHeight}px`
        }

    return (
        <div
            className={classnames('uik-row', className)}
            style={{
                justifyContent: justifyObj[justify],
                alignItems: alignObj[align],
                ...marginStyle,
                ...style
            }}
            {...rest}
        >
            {content}
        </div>
    )
}

export default Row
