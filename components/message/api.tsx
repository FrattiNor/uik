import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Message from './message'
import { messageType, messageConfig, newMessageConfig, messageContent, messageDestroyFun } from './types'

// 配置
let _messageConfig: messageConfig = {
    position: ['top', 'center'],
    duration: 3,
    maxCount: Infinity,
    overAnimate: false
}

// 卸载方法保存对象
const destroyFun: messageDestroyFun = {}

// 获取容器 message 容器
const getContainer = (): HTMLElement => {
    const id = 'uik-message'
    const { position } = _messageConfig
    const classname = classnames(position.map((text) => `uik-message-${text}`).join(' '), 'uik-message')
    const container = document.getElementById(id)

    if (!container) {
        const containerOut = document.createElement('div')
        containerOut.setAttribute('class', 'uik-container')

        const container = document.createElement('div')
        container.setAttribute('class', classname)
        container.setAttribute('id', id)

        containerOut.append(container)
        document.body.append(containerOut)
        return container
    }

    return container
}

// 销毁
const destroy = (id?: string): void => {
    if (id) {
        typeof destroyFun[id] === 'function' && destroyFun[id]()
    } else {
        Object.values(destroyFun).forEach((fun) => fun())
    }
}

// 配置
const config = (newConfig: newMessageConfig): void => {
    _messageConfig = {
        ..._messageConfig,
        ...newConfig
    }
}

// 插入Message
const open = (content: messageContent, options?: { type?: messageType; id?: string }): void => {
    const { type, id } = options || {}
    const container = getContainer()
    const div = document.createElement('div')
    const ReactNode = <Message id={id} father={div} container={container} content={content} type={type} destroyFun={destroyFun} messageConfig={_messageConfig} />
    container.append(div)
    ReactDOM.render(ReactNode, div)
}

export { open, config, destroy }
