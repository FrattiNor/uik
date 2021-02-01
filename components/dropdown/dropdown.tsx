import React, { FC } from 'react'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeRenderProps } from '../_hocs/notice/types'
import { dropdownProps } from './types'
import { MenuInner } from '../menu/menu'
import './dropdown.less'

const DropDown: FC<dropdownProps & noticeRenderProps> = (props) => {
    const { list, onClick } = props

    const truelist = Array.isArray(list) ? list : []

    return <div className="uik-dropdown">{truelist.length > 0 && <MenuInner list={truelist} onClick={onClick} />}</div>
}

const Component = noticeHoc<dropdownProps>({
    backgroundColor: '#fff',
    emptyKey: 'list',
    needArrow: false,
    defaultPosition: 'bottomLeft',
    isDropdown: true,
    updatePositionProps: ['list']
})(DropDown)

export default noticeRenderHoc<dropdownProps>({ name: 'dropdown', defaultTrigger: 'hover' })(Component)
