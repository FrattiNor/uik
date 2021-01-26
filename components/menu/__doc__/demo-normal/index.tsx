import React, { FC } from 'react'
import { Menu } from 'uik'

const Demo: FC = () => {
    const list = [
        {
            name: '1号菜单',
            key: '1'
        },
        {
            name: '2号菜单',
            key: '2'
        },
        {
            name: '3号菜单',
            key: '3'
        }
    ]

    return <Menu list={list} />
}

export default Demo
