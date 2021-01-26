import React, { FC, MouseEvent } from 'react'
import { menuProps } from './types'
import './menu.less'

const MenuInner: FC<menuProps> = (props) => {
    const { list, onClick } = props

    const trueClick = (key: string, name: string, event: MouseEvent) => {
        if (onClick) onClick({ key, name, event })
    }

    return (
        <div className="uik-menu">
            {list.map(({ name, key }) => (
                <div className="uik-menu-item" key={key} onClick={(e) => trueClick(key, name, e)}>
                    {name}
                </div>
            ))}
        </div>
    )
}

const Menu: FC<menuProps> = (props) => {
    return (
        <div className="uik-menu-default">
            <MenuInner {...props} />
        </div>
    )
}

export { MenuInner }
export default Menu
