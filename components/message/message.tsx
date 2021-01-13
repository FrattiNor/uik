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
const Message: FC<messageProps> = ({ father, container, content, type = 'default', id, isOver }) => {

    const key = id || Math.random().toString()
    const [visible, setVisible] = useState(true)
    const { duration } = _messageConfig
    const classname = visible ? (isOver ? '' : 'show') : 'hidden'

    const unmount = useCallback(() => {
        if (father && container) {
            unmountComponentAtNode(father)
            container.removeChild(father)
        }
    }, [father, container])

    const hiddenAndUnmount = () => {
        setTimeout(() => {
            setVisible(false)

            setTimeout(() => {
                unmount()
            }, 500)
        }, duration * 1000)

        delete destroyFun[key]
    }

    useEffect(() => {
        if (duration !== 0) {
            hiddenAndUnmount()
        }
    }, [])

    useEffect(() => {
        destroyFun[key] = hiddenAndUnmount
    }, [key])

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

// 超过maxCount删除第一个元素
const delOverMax = (container: HTMLElement): boolean => {
    const { maxCount } = _messageConfig
    const child = container.children

    if (child.length >= maxCount) {
        unmountComponentAtNode(child[0])
        container.removeChild(child[0])
        return true
    }

    return false
}

// 销毁
const destroy = (id?: string): void => {
    if (id) {
        destroyFun[id]()
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
    const isOver = delOverMax(container)
    const div = document.createElement('div')
    const ReactNode = <Message isOver={isOver} id={id} father={div} container={container} content={content} type={type} />
    container.append(div)
    ReactDOM.render(ReactNode, div)
}

export { open, config, destroy }
