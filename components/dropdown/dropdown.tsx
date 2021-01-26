import React, { FC } from 'react'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeBackFC } from '../_hocs/notice/types'
import { dropdownProps } from './types'
import { MenuInner } from '../menu/menu'
import './dropdown.less'

const DropDonw: FC<dropdownProps> = (props) => {
    const { overlayList, onClick } = props

    const list = Array.isArray(overlayList) ? overlayList : []

    return <div className="uik-dropdown">{list.length > 0 && <MenuInner list={list} onClick={onClick} />}</div>
}

const Component = noticeHoc({ backgroundColor: '#fff', emptyKey: 'overlayList', needArrow: false, defaultPosition: 'bottomLeft' })(DropDonw)

export default noticeRenderHoc({ Component, name: 'dropdown', defaultTrigger: 'hover' }) as noticeBackFC<dropdownProps>
