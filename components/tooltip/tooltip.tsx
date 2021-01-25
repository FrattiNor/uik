import React, { FC } from 'react'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeBackFC } from '../_hocs/notice/types'
import { tooltipProps } from './types'
import './tooltip.less'

const Notice: FC<tooltipProps> = (props) => {
    const { title } = props
    
    return <div className="uik-tooltip">{title}</div>
}

const Component = noticeHoc({ backgroundColor: 'rgba(0, 0, 0, 0.75)', emptyKey: 'title' })(Notice)

export default noticeRenderHoc({ Component, name: 'tooltip', defaultTrigger: 'hover' }) as noticeBackFC<tooltipProps>
