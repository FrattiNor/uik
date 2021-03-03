/* eslint-disable no-unused-vars */
import { HTMLAttributes, MouseEvent } from 'react'

export type menuListItem = { name: string; key: string }
export type menuList = menuListItem[]
export type menuTitleListItem = { title: string; key: string; list: menuTitleList }
export type menuTitleList = (menuListItem | menuTitleListItem)[]
export type menuClick = ({ key, name, event }: { key: string; name: string; event: MouseEvent }) => void
export type menuTitleClick = ({ key, title, event }: { key: string; title: string; event: MouseEvent }) => void

export type changeKey = (key: string) => void
export type changeKeys = (key: string[]) => void

export type menuProps = {
    width?: number
} & menuInnerProps &
    HTMLAttributes<HTMLDivElement>

export type menuInnerProps = {
    list: menuTitleList
    collapsed?: boolean
    defaultSelectedKeys?: string[]
    defaultOpenKeys?: string[]
    selectedKeys?: string[]
    openKeys?: string[]
    onTitleClick?: menuTitleClick
    onClick?: menuClick
    onSelectedKeysChange?: changeKeys
    onOpenKeysChange?: changeKeys
    multiple?: boolean
}

export type menuLoopProps = {
    list: menuTitleList
    collapsed?: boolean
    selectedKeys?: string[]
    openKeys?: string[]
    onTitleClick?: menuTitleClick
    onClick?: menuClick
    zIndex?: number
    changeOpenKeys?: changeKey
    changeSelectedKeys?: changeKey
}

export type menuTitleListProps = menuTitleListItem & {
    itemKey: string // key无法作为props传递
    collapsed?: boolean
    zIndex: number
    selectedKeys: string[]
    openKeys: string[]
    changeOpenKeys?: changeKey
    changeSelectedKeys?: changeKey
    onTitleClick?: menuTitleClick
    onClick?: menuClick
}

export type menuItemProps = menuListItem & {
    itemKey: string // key无法作为props传递
    zIndex: number
    selectedKeys: string[]
    changeSelectedKeys?: changeKey
    onClick?: menuClick
}
