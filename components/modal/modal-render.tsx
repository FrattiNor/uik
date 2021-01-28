import React, { FC, useState, useEffect, Fragment, useMemo } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import Modal from './modal'
import { getContainer } from '../_utils'
import { modalProps } from './types'
import { useEffectOnce } from '../_hooks'

// 获取容器 modal 容器
const getModalContainer = (): HTMLElement => {
    const id = 'uik-modal'

    const container = getContainer({
        id,
        containerType: 'fixed',
        zIndex: 1000 // modal 1000, notice 1001, confirm 1001 ,message 1002
    })

    return container
}

// 渲染组件
const ModalRender: FC<modalProps> = (props) => {
    const { visible = false } = props
    const [div, setDiv] = useState<HTMLDivElement | null>(null)
    const [container, setContainer] = useState<HTMLElement | null>(null)
    const DOM = useMemo(() => <Modal {...props} />, [props])

    // 只创建一次 挂载点（div）
    useEffectOnce(
        visible,
        () => {
            const container = getModalContainer()
            const div = document.createElement('div')
            div.setAttribute
            container.append(div)
            setDiv(div)
            setContainer(container)
        },
        [visible]
    )

    // 根据props更新Modal
    useEffect(() => {
        if (div !== null) {
            ReactDOM.render(DOM, div)
        }
    }, [div, DOM])

    // 挂载点发生变化时，取消挂载
    useEffect(() => {
        return () => {
            if (div !== null) {
                unmountComponentAtNode(div)
                if (container !== null) {
                    container.removeChild(div)
                }
            }
        }
    }, [div])

    return <Fragment />
}

export default ModalRender
