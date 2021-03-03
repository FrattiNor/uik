import React, { FC } from 'react'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeProps } from '../_hocs/notice/types'
import { tooltipProps } from './types'
import './tooltip.less'

const Tooltip: FC<tooltipProps & noticeProps> = (props) => {
    const { title } = props

    return <div className="uik-tooltip">{title}</div>
}

const Component = noticeHoc<tooltipProps>({ backgroundColor: 'rgba(0, 0, 0, 0.75)', emptyKey: 'title', updatePositionProps: ['title'] })(Tooltip)

export default noticeRenderHoc<tooltipProps>({ name: 'tooltip', defaultTrigger: 'hover', defaultZIndex: 1004 })(Component)
