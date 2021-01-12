import React, { FC, useCallback, useEffect, ReactNode } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { messageProps, messageType, messageConfig } from './types'
import { createContainer } from '../_utils'
import './message.less'

// 默认配置
let _messageConfig = {
    position: ['top', 'center'],
    duration: 3,
    maxCount: 3
}

// Message组件
const Message: FC<messageProps> = ({ father, container, content }) => {
    const { duration } = _messageConfig

    const unmount = useCallback(() => {
        if (father && container) {
            unmountComponentAtNode(father)
            container.removeChild(father)
        }
    }, [father, container])

    useEffect(() => {
        if (duration !== 0) {
            setTimeout(() => {
                unmount()
            }, duration * 1000)
        }
    }, [])

    return <div className="uik-message">{content}</div>
}

// 获取容器 message 容器
const getContainer = (): HTMLElement | null => {
    const { position, maxCount } = _messageConfig
    const classnames = position.map((text) => `uik-message-container-${text}`).join(' ')

    const container = createContainer({
        id: 'uik-message-container',
        className: `uik-message-container ${classnames} uik-message-max-${maxCount + 1}`
    })

    return container
}

// 插入Message
const appendMessage = ({ type, content }: { type: messageType; content: string | ReactNode }) => {
    const container = getContainer()
    const div = document.createElement('div')
    const Node = <Message father={div} container={container} content={content} type={type} />
    ReactDOM.render(Node, div)
    container?.append(div)
}

const success = (content: string | ReactNode): void => appendMessage({ type: 'success', content })
const error = (content: string | ReactNode): void => appendMessage({ type: 'error', content })
const warn = (content: string | ReactNode): void => appendMessage({ type: 'warn', content })
const info = (content: string | ReactNode): void => appendMessage({ type: 'info', content })

const config = (newConfig: messageConfig): void => {
    _messageConfig = {
        ..._messageConfig,
        ...newConfig
    }
}

export { success, error, warn, info, config }
