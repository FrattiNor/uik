import React, { FC, useCallback, useEffect, useState } from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import classnames from 'classnames'
import Icon from '../icon'
import { messageProps, messageType, messageConfig, messageContent, messageDestroyFun } from './types'
import './message.less'

// 默认配置
let _messageConfig = {
    position: ['top', 'center'],
    duration: 3,
    maxCount: 3
}

const destroyFun: messageDestroyFun = {}

// Message组件
const Message: FC<messageProps> = ({ father, container, content, type = 'default', id }) => {
    const { duration, maxCount } = _messageConfig
    // 记录卸载方法的唯一key
    const key = id || Math.random().toString()
    const [visible, setVisible] = useState(true)
    const classname = visible ? 'show' : 'hidden'

    // 卸载方法 取消挂载以及移除dom
    const unmount = useCallback(() => {
        if (father && container) {
            unmountComponentAtNode(father)
            container.removeChild(father)
        }
    }, [father, container])

    // 执行隐藏动画 后 卸载 并 移除destroyFun
    const hidden_Unmount = () => {
        setVisible(false)

        setTimeout(() => {
            unmount()
        }, 500)

        delete destroyFun[key]
    }

    // 将卸载方法 保存在destroyFun
    // 并判断加入本方法后是否超过最大长度，如超过则执行最前面的卸载方法
    const addDestroyFun_JudgeOverMaxCount = () => {
        destroyFun[key] = hidden_Unmount
        const list = Object.values(destroyFun)
        if (list.length > maxCount) {
            list[0]()
        }
    }

    // 手动增加卸载方法
    useEffect(() => {
        addDestroyFun_JudgeOverMaxCount()
    }, [])

    // 自动卸载
    useEffect(() => {
        if (duration !== 0) {
            setTimeout(() => {
                hidden_Unmount()
            }, duration * 1000)
        }
    }, [])

    return (
        <div className={`uik-message-item ${classname}`}>
            {type !== 'default' && <Icon name={type} className={`uik-message-item-icon ${type}`} />}
            {content}
        </div>
    )
}

// 获取容器 message 容器
const getContainer = (): HTMLElement => {
    const id = 'uik-message-container'
    const { position } = _messageConfig
    const classname = classnames(position.map((text) => `uik-message-container-${text}`).join(' '), 'uik-message-container')
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
const config = (newConfig: messageConfig): void => {
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
    const ReactNode = <Message id={id} father={div} container={container} content={content} type={type} />
    container.append(div)
    ReactDOM.render(ReactNode, div)
}

export { open, config, destroy }
