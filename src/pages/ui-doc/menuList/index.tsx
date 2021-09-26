import React, { FC } from 'react'
import menuString from '!!raw-loader!uik' // 无视报错即可
import { formatMenuString } from './util'

const menu = formatMenuString(menuString)

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

    return () => <>暂无文档</>
}

export { menu, getTitle, judgeName, getDoc }
