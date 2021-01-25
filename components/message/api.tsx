import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Message from './message'
import { getContainer } from '../_utils'
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
const getMessageContainer = (): HTMLElement => {
    const { position } = _messageConfig
    const id = `uik-message-${position.join('-')}` // 不同定位需要不同的容器
    const classname = classnames('uik-message-container', position.map((text) => `uik-message-container-${text}`).join(' '))

    const container = getContainer({
        id,
        classname,
        containerType: 'fixed',
        zIndex: 1002 // modal 1000, tooltip 1001, confirm 1001 ,message 1002
    })

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
    const container = getMessageContainer()
    const div = document.createElement('div')
    const ReactNode = (
        <Message id={id} father={div} container={container} content={content} type={type} />
    )
    container.append(div)
    ReactDOM.render(ReactNode, div)
}

export { open, config, destroy, _messageConfig, destroyFun }
