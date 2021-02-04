import React, { FC, useState } from 'react'
import { Progress, Slider, Input, message, Switch, Checkbox, Menu } from 'uik'

const Test: FC = () => {
    const [percent, setPercent] = useState(60)
    const [b, setB] = useState(false)

    const a = (v) => {
        console.log(v)
        setPercent(v)
        message.open('aaa', { showClose: true })
    }

    const list = [
        {
            title: '111aaaaaa1',
            key: '11',
            list: [
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
        },
        {
            title: '2222',
            key: '22',
            list: [
                {
                    name: '4号菜单',
                    key: '4'
                },
                {
                    name: '5号菜单',
                    key: '5'
                },
                {
                    title: '3333',
                    key: '33',
                    list: [
                        {
                            name: '7号菜单',
                            key: '7'
                        },
                        {
                            name: '8号菜单',
                            key: '8'
                        },
                        {
                            name: '9号菜单',
                            key: '9'
                        },
                        {
                            title: '4444',
                            key: '44',
                            list: [
                                {
                                    name: '7号菜单',
                                    key: '10'
                                },
                                {
                                    name: '8号菜单',
                                    key: '11'
                                },
                                {
                                    name: '9号菜单',
                                    key: '12'
                                }
                            ]
                        },
                        {
                            title: '5555',
                            key: '55',
                            list: [
                                {
                                    name: '7号菜单',
                                    key: '13'
                                },
                                {
                                    name: '8号菜单',
                                    key: '14'
                                },
                                {
                                    name: '9号菜单',
                                    key: '15'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    return (
        <>
            <div style={{ margin: 24 }}>
                <Menu list={list} />
            </div>
        </>
    )
}

export default Test
