import React, { FC, MouseEvent } from 'react'
import classnames from 'classnames'
import { menuItemProps } from './types'

// menu-item
const MenuItem: FC<menuItemProps> = (props) => {
    const { name, onClick, itemKey, zIndex, selectedKeys, changeSelectedKeys } = props
    const selected = selectedKeys.includes(itemKey)

    const itemClick = (key: string, name: string, event: MouseEvent) => {
        if (onClick) onClick({ key, name, event })
        if (changeSelectedKeys) changeSelectedKeys(key)
    }

    return (
        <div className={classnames('uik-menu-item', { selected })} style={{ paddingLeft: zIndex * 15 }} onClick={(e) => itemClick(itemKey, name, e)}>
            {name}
        </div>
    )
}

export default MenuItem
