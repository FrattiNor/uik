import React, { FC } from 'react'
import classnames from 'classnames'
import { colProps } from './types'
import { getGutter } from './util'
import './col.less'

const Col: FC<colProps> = (props) => {
    const { span, leftSpan, rightSpan, gutter, spanAll, children, className, style = {}, rowGap, ...rest } = props

    const widthPercent = `${(span / (spanAll as number)) * 100}%`
    const marginLeft = `${leftSpan ? (leftSpan / (spanAll as number)) * 100 : 0}%`
    const marginRight = `${rightSpan ? (rightSpan / (spanAll as number)) * 100 : 0}%`
    const [gutterWidth, gutterHeight] = getGutter(gutter)

    const paddingStyle = rowGap
        ? {
            padding: `0 ${gutterWidth / 2}px`
        }
        : {
            padding: `${gutterHeight / 2}px ${gutterWidth / 2}px`
        }

    return (
        <div
            className={classnames('uik-col', className)}
            style={{ flexBasis: widthPercent, marginLeft, marginRight, ...paddingStyle, ...style }}
            {...rest}
        >
            {children}
        </div>
    )
}

export default Col
