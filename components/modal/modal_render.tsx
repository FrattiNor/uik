import React, { FC, useState, useEffect, Fragment, useMemo } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import Modal from './modal'
import { getContainer } from '../_utils'
import { modalProps } from './types'

// 获取容器 message 容器
const getModalContainer = (): HTMLElement => {
    const id = 'uik-modal'
    const modalContainer = document.getElementById(id)

    if (!modalContainer) {
        const container = getContainer()
        const modalContainer = document.createElement('div')
        modalContainer.setAttribute('id', id)

        container.append(modalContainer)
        document.body.append(container)
        return modalContainer
    }

    return modalContainer
}

// 渲染组件
const ModalRender: FC<modalProps> = (props) => {
    const { visible = false } = props

    const [div, setDiv]: [HTMLDivElement | null, any] = useState(null)
    const [render, setRender] = useState(false)
    const DOM = useMemo(() => <Modal {...props} />, [props])

    // 只创建一次div
    useEffect(() => {
        if (visible && !render) {
            const container = getModalContainer()
            const div = document.createElement('div')
            div.setAttribute
            container.append(div)
            setDiv(div)
            setRender(true)
        }
    }, [visible])

    // 根据props更新Modal
    useEffect(() => {
        if (div !== null) {
            ReactDOM.render(DOM, div)
        }
    }, [div, DOM])

    // 卸载时unmountComponentAtNode，想把visible:false传入的话需要再ReactDOM.render一次，因为卸载后不会再执行useEffect了
    useEffect(() => {
        return () => {
            if (div !== null) {
                ReactDOM.render(<Modal {...props} visible={false} />, div)
                setTimeout(() => {
                    unmountComponentAtNode(div)
                }, 350)
            }
        }
    }, [div])

    return <Fragment />
}

export default ModalRender
