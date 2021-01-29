import React, { FC } from 'react'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeBackFC } from '../_hocs/notice/types'
import { dropdownProps } from './types'
import { MenuInner } from '../menu/menu'
import './dropdown.less'

const DropDonw: FC<dropdownProps> = (props) => {
    const { list, onClick } = props

    const truelist = Array.isArray(list) ? list : []

    return <div className="uik-dropdown">{truelist.length > 0 && <MenuInner list={truelist} onClick={onClick} />}</div>
}

const Component = noticeHoc({ backgroundColor: '#fff', emptyKey: 'list', needArrow: false, defaultPosition: 'bottomCenter' })(DropDonw)

export default noticeRenderHoc({ Component, name: 'dropdown', defaultTrigger: 'hover' }) as noticeBackFC<dropdownProps>
