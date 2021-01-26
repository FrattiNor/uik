import React, { FC } from 'react'
import { Button, DropDown } from 'uik'

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

    return (
        <DropDown overlayList={list}>
            <Button>鼠标移入触发DropDown</Button>
        </DropDown>
    )
}

export default Demo
