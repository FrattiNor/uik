import { FC } from 'react'
import EmptyComponent from '@/components/empty-component'

const menu = [
    {
        title: '通用',
        components: [
            {
                name: 'button',
                desc: 'Button 按钮'
            },
            {
                name: 'icon',
                desc: 'Icon 图标'
            },
            {
                name: 'menu',
                desc: 'Menu 菜单'
            },
            {
                name: 'sticky',
                desc: 'Sticky 固钉'
            }
        ]
    },
    {
        title: '输入',
        components: [
            {
                name: 'input',
                desc: 'Input 输入框'
            },
            {
                name: 'slider',
                desc: 'Slider 滑块'
            },
            {
                name: 'switch',
                desc: 'Switch 开关'
            }
        ]
    },
    {
        title: '状态',
        components: [
            {
                name: 'loading',
                desc: 'Loading 加载中'
            },
            {
                name: 'progress',
                desc: 'Progress 进度条'
            }
        ]
    },
    {
        title: '反馈',
        components: [
            {
                name: 'message',
                desc: 'message 消息反馈'
            },
            {
                name: 'modal',
                desc: 'Modal 弹窗'
            },
            {
                name: 'tooltip',
                desc: 'Tooltip 文字提示'
            },
            {
                name: 'confirm',
                desc: 'Confirm 确认弹窗'
            },
            {
                name: 'dropdown',
                desc: 'Dropdown 下拉菜单'
            }
        ]
    }
]

// 扁平化menu
const flatMenu = JSON.stringify(menu).match(/{"name":".+?","desc":".+?"}/g)

// 获取title
const getTitle = (name: string): string => {
    let res = ''

    flatMenu?.some((text) => {
        const reg = new RegExp(`"name":"${name}","desc":"(.+)"`)
        const matchResult = text.match(reg)
        if (matchResult) {
            res = matchResult?.[1] || '暂无'
        }

        return matchResult
    })

    return res
}

// 判断是否存在name
const judgeName = (name: string): boolean => {
    let res = false

    flatMenu?.some((text) => {
        const reg = new RegExp(`"name":"${name}"`)
        const matchResult = text.match(reg)
        if (matchResult) {
            res = true
        }
        return matchResult
    })

    return res
}

// 获取文档
const getDoc = (name: string): FC => {
    if (judgeName(name)) {
        try {
            return require(`uik/${name}/__doc__/index.mdx`)?.default
        } catch (e) {
            console.error(`not found ${name}'s doc!`)
        }
    }

    return EmptyComponent
}

export { menu, getTitle, judgeName, getDoc }
