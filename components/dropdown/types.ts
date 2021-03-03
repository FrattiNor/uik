/* eslint-disable no-unused-vars */
import { menuClick, menuTitleList, menuTitleClick, changeKeys } from '../menu/types'

export type dropdownProps = {
    list: menuTitleList
    collapsed?: boolean
    defaultOpenKeys?: string[]
    openKeys?: string[]
    onTitleClick?: menuTitleClick
    onClick?: menuClick
    onOpenKeysChange?: changeKeys

    closeClearOpenKeys?: boolean // 关闭时触发清空openKeys
}
