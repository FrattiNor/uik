import React, { FC, useEffect } from 'react'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeProps } from '../_hocs/notice/types'
import { dropdownProps } from './types'
import MenuInner from '../menu/menu-inner'
import { useHalfControlled } from '../_hooks'
import './dropdown.less'

const DropDown: FC<dropdownProps & noticeProps> = (props) => {
    const {
        list,
        collapsed,
        defaultOpenKeys,
        openKeys: OutOpenKeys,
        onTitleClick,
        onClick,
        onOpenKeysChange: outOnOpenKeysChange,
        closeClearOpenKeys = true,
        visible
    } = props

    const truelist = Array.isArray(list) ? list : []

    const [openKeys, setOpenKeys] = useHalfControlled(OutOpenKeys, outOnOpenKeysChange, defaultOpenKeys || [])

    const menuProps = {
        list: truelist,
        collapsed,
        defaultOpenKeys,
        openKeys,
        onTitleClick,
        onClick,
        onOpenKeysChange: setOpenKeys
    }

    useEffect(() => {
        if (!visible && closeClearOpenKeys) {
            setOpenKeys([])
        }
    }, [visible, closeClearOpenKeys])

    return <div className="uik-dropdown">{truelist.length > 0 && <MenuInner {...menuProps} selectedKeys={[]} />}</div>
}

const Component = noticeHoc<dropdownProps>({
    backgroundColor: '#fff',
    emptyKey: 'list',
    needArrow: false,
    defaultPosition: 'bottomLeft',
    isDropdown: true,
    updatePositionProps: ['list']
})(DropDown)

export default noticeRenderHoc<dropdownProps>({ name: 'dropdown', defaultTrigger: 'hover', defaultZIndex: 1001 })(Component)
