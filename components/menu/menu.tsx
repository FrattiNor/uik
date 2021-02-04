import React, { FC, Fragment, useState } from 'react'
import classnames from 'classnames'
import { menuProps, menuInnerProps, menuTitleListItem, menuListItem } from './types'
import MenuTitleList from './menu-title-list'
import MenuItem from './menu-item'
import './menu.less'

// menu内部 少个div
const MenuInner: FC<menuInnerProps> = (props) => {
    const { list, onClick, onTitleClick, collapsed = true, zIndex = 1, selectedKeys = [], openKeys = [], changeSelectedKeys, changeOpenKeys } = props

    const titleProps = {
        onClick,
        onTitleClick,
        collapsed,
        zIndex,
        selectedKeys,
        openKeys,
        changeSelectedKeys,
        changeOpenKeys
    }

    const itemProps = {
        onClick,
        zIndex,
        selectedKeys,
        changeSelectedKeys
    }

    return (
        <Fragment>
            {list.map((item) => {
                if ((item as menuTitleListItem).title) {
                    return <MenuTitleList {...(item as menuTitleListItem)} itemKey={item.key} {...titleProps} />
                } else {
                    return <MenuItem {...(item as menuListItem)} itemKey={item.key} {...itemProps} />
                }
            })}
        </Fragment>
    )
}

const Menu: FC<menuProps> = (props) => {
    const {
        list,
        collapsed,
        selectedKeys: OutselectedKeys,
        openKeys: outOpenKeys,
        defaultOpenKeys,
        defaultSelectedKeys,
        onTitleClick,
        onClick,
        onOpenKeysChange,
        onSelectedKeysChange,
        multiple = false,
        className,
        style = {},
        width,
        ...restProps
    } = props

    const [virtualSelectedKeys, setVirtualSelectedKeys] = useState<string[]>(defaultSelectedKeys || [])
    const [virtualOpenKeys, setVirtualOpenKeys] = useState<string[]>(defaultOpenKeys || [])

    const selectedKeys = Array.isArray(OutselectedKeys) ? OutselectedKeys : virtualSelectedKeys
    const openKeys = Array.isArray(outOpenKeys) ? outOpenKeys : virtualOpenKeys

    const changeSelectedKeys = (key: string) => {
        let newKeys
        if (multiple) {
            if (selectedKeys.includes(key)) {
                newKeys = selectedKeys.filter((item) => item !== key)
            } else {
                newKeys = [...selectedKeys, key]
            }
        } else {
            newKeys = [key]
        }
        setVirtualSelectedKeys(newKeys)
        if (onSelectedKeysChange) onSelectedKeysChange(newKeys)
    }

    const changeOpenKeys = (key: string) => {
        let newKeys
        if (openKeys.includes(key)) {
            newKeys = openKeys.filter((item) => item !== key)
        } else {
            newKeys = [...openKeys, key]
        }
        setVirtualOpenKeys(newKeys)
        if (onOpenKeysChange) onOpenKeysChange(newKeys)
    }

    const innerProps = {
        list,
        collapsed,
        selectedKeys,
        openKeys,
        changeSelectedKeys,
        changeOpenKeys,
        onTitleClick,
        onClick
    }

    return (
        <div className={classnames('uik-menu', className)} style={{ ...style, width }} {...restProps}>
            <MenuInner {...innerProps} />
        </div>
    )
}

export { MenuInner }
export default Menu
