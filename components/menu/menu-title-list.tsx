import React, { FC, Fragment, MouseEvent, useRef, useState, CSSProperties } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { useEffectAfterFirst, useResizeObserver } from '../_hooks'
import { menuTitleListProps, menuTitleList, menuTitleListItem } from './types'
import { MenuInner } from './menu'

// menu-title + list
const MenuTitleList: FC<menuTitleListProps> = (props) => {
    // props
    const { title = '', list = [], itemKey, collapsed, onTitleClick, zIndex, openKeys, changeOpenKeys, selectedKeys, ...restProps } = props
    // list是否展开
    const open = collapsed ? openKeys.includes(itemKey) : true
    // 从child里遍历找是否存在选中
    const findIncludesKey = (list: menuTitleList): boolean =>
        list.some((item) => {
            const { key, list } = item as menuTitleListItem
            return list ? findIncludesKey(list) : selectedKeys.includes(key)
        })
    // 是否有child选中
    const childSelected = findIncludesKey(list)
    // list本体，用于获取list的height
    const listRef = useRef<HTMLDivElement>(null)
        
    const showTimeout = useRef<NodeJS.Timeout | null>(null)
    const transitionTimeout = useRef<NodeJS.Timeout | null>(null)

    const [transition, setTransition] = useState(false)
    const [show, setShow] = useState(open)
    const [style, setStyle] = useState<CSSProperties>({})

    useResizeObserver(listRef.current, setStyle)

    const titleClick = (key: string, title: string, event: MouseEvent) => {
        if (onTitleClick) onTitleClick({ key, title, event })
        if (changeOpenKeys && collapsed) changeOpenKeys(key)
    }

    // 点击title
    const openList = (newShow?: boolean) => {
        if (showTimeout.current !== null) clearTimeout(showTimeout.current)
        if (transitionTimeout.current !== null) clearTimeout(transitionTimeout.current)

        setTransition(true)
        showTimeout.current = setTimeout(() => {
            setShow(typeof newShow === 'boolean' ? newShow : !show)
        }, 50)
        transitionTimeout.current = setTimeout(() => {
            setTransition(false)
        }, 300)
    }

    useEffectAfterFirst(() => {
        if (open) {
            openList(true)
        } else {
            openList(false)
        }
    }, [open])

    return (
        <Fragment>
            <div
                className={classnames('uik-menu-title uik-menu-item', { ['child-selected']: childSelected })}
                style={{ paddingLeft: zIndex * 15 }}
                onClick={(e) => titleClick(itemKey, title, e)}
            >
                {title}
                {collapsed && <Icon className={classnames('uik-menu-title-icon', { show })} defaultIcon name="arrow-down" />}
            </div>
            <div
                className={classnames('uik-menu-list')}
                style={{ maxHeight: show ? style.height : 0, transition: transition ? 'max-height 0.3s' : 'unset' }}
            >
                <div ref={listRef}>
                    <MenuInner
                        list={list}
                        openKeys={openKeys}
                        selectedKeys={selectedKeys}
                        changeOpenKeys={changeOpenKeys}
                        zIndex={zIndex + 1}
                        {...restProps}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default MenuTitleList
