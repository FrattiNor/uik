/* eslint-disable no-unused-vars */
import { MouseEvent } from 'react'

export type menuList = { name: string; key: string }[]
export type menuClick = ({ key, name, event }: { key: string; name: string; event: MouseEvent }) => void

export type menuProps = {
    list: menuList
    onClick?: menuClick
}
