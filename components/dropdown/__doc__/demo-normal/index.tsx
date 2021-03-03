import React, { FC } from 'react'
import { Button, Dropdown } from 'uik'

const Demo: FC = () => {
    // const list = [
    //     {
    //         name: '1号菜单',
    //         key: '1'
    //     },
    //     {
    //         name: '2号菜单',
    //         key: '2'
    //     },
    //     {
    //         name: '3号菜单',
    //         key: '3'
    //     }
    // ]

    const list = [
        {
            title: '1号标题',
            key: 't1',
            list: [
                {
                    name: '1.1号菜单',
                    key: '11'
                },
                {
                    name: '1.2号菜单',
                    key: '12'
                },
                {
                    name: '1.3号菜单',
                    key: '13'
                },
                {
                    title: '4号标题',
                    key: 't4',
                    list: [
                        {
                            name: '4.1号菜单',
                            key: '41'
                        },
                        {
                            name: '4.2号菜单',
                            key: '42'
                        },
                        {
                            name: '4.3号菜单',
                            key: '43'
                        },
                        {
                            title: '5号标题',
                            key: 't5',
                            list: [
                                {
                                    name: '5.1号菜单',
                                    key: '51'
                                },
                                {
                                    name: '5.2号菜单',
                                    key: '52'
                                },
                                {
                                    name: '5.3号菜单',
                                    key: '53'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: '2号标题',
            key: 't2',
            list: [
                {
                    name: '2.1号菜单',
                    key: '21'
                },
                {
                    name: '2.2号菜单',
                    key: '22'
                },
                {
                    name: '2.3号菜单',
                    key: '23'
                }
            ]
        },
        {
            title: '3号标题',
            key: 't3',
            list: [
                {
                    name: '3.1号菜单',
                    key: '31'
                },
                {
                    name: '3.2号菜单',
                    key: '32'
                },
                {
                    name: '3.3号菜单',
                    key: '33'
                }
            ]
        }
    ]

    return (
        <Dropdown list={list}>
            <Button type="primary">鼠标移入触发Dropdown</Button>
        </Dropdown>
    )
}

export default Demo
