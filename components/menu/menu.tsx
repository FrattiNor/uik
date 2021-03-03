import React, { FC } from 'react'
import classnames from 'classnames'
import MenuInner from './menu-inner'
import { menuProps } from './types'
import './menu.less'

// menu 结构

// menu 对menu-inner进行一次包装，赋予样式等
// menu-inner
// menu-title-list + menu-item

// menu
const Menu: FC<menuProps> = (props) => {
    const {
        list,
        collapsed,
        selectedKeys,
        openKeys,
        defaultOpenKeys,
        defaultSelectedKeys,
        onTitleClick,
        onClick,
        onOpenKeysChange,
        onSelectedKeysChange,
        multiple,
        className,
        style = {},
        width,
        ...restProps
    } = props

    const forOtherProps = {
        list,
        collapsed,
        selectedKeys,
        openKeys,
        defaultOpenKeys,
        defaultSelectedKeys,
        onTitleClick,
        onClick,
        onOpenKeysChange,
        onSelectedKeysChange,
        multiple
    }

    return (
        <div className={classnames('uik-menu', className)} style={{ ...style, width }} {...restProps}>
            <MenuInner {...forOtherProps} />
        </div>
    )
}

export default Menu
