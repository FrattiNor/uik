import React, { FC, Fragment, useEffect, useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { tooltipProps } from './types'
import { getContainer } from '../_utils'
import Tooltip from './tooltip'

// 获取容器 message 容器
const getTooltipContainer = (): HTMLElement => {
    const id = 'uik-tooltip'
    const tooltipContainer = document.getElementById(id)

    if (!tooltipContainer) {
        const container = getContainer()
        const tooltipContainer = document.createElement('div')
        tooltipContainer.setAttribute('id', id)

        container.append(tooltipContainer)
        document.body.append(container)
        return tooltipContainer
    }

    return tooltipContainer
}

const TooltipRender: FC<tooltipProps> = ({ children, ...restProps }) => {
    const { visible = false } = restProps
    const [div, setDiv]: [HTMLDivElement | null, any] = useState(null)
    const [render, setRender] = useState(false)
    const DOM = useMemo(() => <Tooltip {...restProps} />, [restProps])

    // 只创建一次div
    useEffect(() => {
        if (visible && !render) {
            const container = getTooltipContainer()
            const div = document.createElement('div')
            div.setAttribute
            container.append(div)
            setDiv(div)
            setRender(true)
        }
    }, [visible])

    // 根据props更新Tooltip
    useEffect(() => {
        if (div !== null) {
            ReactDOM.render(DOM, div)
        }
    }, [div, DOM])

    return <Fragment>{children}</Fragment>
}

export default TooltipRender
