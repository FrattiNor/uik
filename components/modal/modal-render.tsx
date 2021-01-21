import React, { FC, useState, useEffect, Fragment, useMemo } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { useEffectOnce } from '../_hooks'
import Modal from './modal'
import { getContainer } from '../_utils'
import { modalProps } from './types'

// 获取容器 modal 容器
const getModalContainer = (): HTMLElement => {
    const id = 'uik-modal'

    const container = getContainer({
        id,
        containerType: 'fixed',
        zIndex: 1000 // modal 1000, tooltip 1001 ,message 1002
    })

    return container
}

// 渲染组件
const ModalRender: FC<modalProps> = (props) => {
    const { visible = false } = props

    const [div, setDiv]: [HTMLDivElement | null, any] = useState(null)
    const DOM = useMemo(() => <Modal {...props} />, [props])

    // 只创建一次div
    useEffectOnce(
        visible,
        () => {
            if (visible) {
                const container = getModalContainer()
                const div = document.createElement('div')
                div.setAttribute
                container.append(div)
                setDiv(div)
            }
        },
        [visible]
    )

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
