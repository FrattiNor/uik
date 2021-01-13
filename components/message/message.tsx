import React, { FC, useCallback, useEffect, useState } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { Icon } from 'uik'
import { messageProps, messageType, messageConfig, messageContent } from './types'
import { createContainer } from '../_utils'
import './message.less'

// 默认配置
let _messageConfig = {
    position: ['top', 'center'],
    duration: 3,
    maxCount: 3
}

// Message组件
const Message: FC<messageProps> = ({ father, container, content, type = 'default', id }) => {
    const [visible, setVisible] = useState(true)
    const { duration } = _messageConfig

    // const classname = visible ? (isOver ? '' : 'show') : 'hidden'
    const classname = visible ? 'show' : 'hidden'

    const unmount = useCallback(() => {
        if (father && container) {
            unmountComponentAtNode(father)
            container.removeChild(father)
        }
    }, [father, container])

    useEffect(() => {
        if (duration !== 0) {
            setTimeout(() => {
                setVisible(false)

                setTimeout(() => {
                    unmount()
                }, 500)
            }, duration * 1000)
        }
    }, [])

    const props = id ? { id } : {}

    return (
        <div className={`uik-message-item ${classname}`} {...props}>
            {type !== 'default' && <Icon name={type} className={`uik-message-item-icon ${type}`} />}
            {content}
        </div>
    )
}

// 获取容器 message 容器
const getContainer = (): HTMLElement | null => {
    const { position } = _messageConfig
    const classnames = position.map((text) => `uik-message-container-${text}`).join(' ')

    const container = createContainer({
        id: 'uik-message-container',
        className: `uik-message-container ${classnames}`
    })

    return container
}

// 超过maxCount删除第一个元素
const delOverMax = (container: HTMLElement | null): boolean => {
    const { maxCount } = _messageConfig
    const divs = container?.childNodes
    if (divs && divs?.length >= maxCount) {
        container?.removeChild(divs[0])
        return true
    }

    return false
}

// 销毁
const destroy = (): void => {
    const container = getContainer()
    const divs = container?.childNodes
    if (divs) {
        while (divs[0]) {
            container?.removeChild(divs[0])
        }
    }
}

// 配置
const config = (newConfig: messageConfig): void => {
    _messageConfig = {
        ..._messageConfig,
        ...newConfig
    }
}

// 插入Message
const open = (content: messageContent, options?: { type?: messageType; key?: string }): void => {
    const { type, key } = options || {}
    const container = getContainer()
    delOverMax(container)
    const div = document.createElement('div')
    const ReactNode = <Message id={key} father={div} container={container} content={content} type={type} />
    container?.append(div)
    ReactDOM.render(ReactNode, div)
}

export { open, config, destroy }
