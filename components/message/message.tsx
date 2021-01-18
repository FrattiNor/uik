import React, { FC, useEffect, useState, useRef, MutableRefObject, useLayoutEffect } from 'react'
import { unmountComponentAtNode } from 'react-dom'
import classnames from 'classnames'
import Icon from '../icon'
import { messageProps } from './types'
import './message.less'

// Message组件
const Message: FC<messageProps> = ({ father, container, content, type = 'default', id, messageConfig, destroyFun }) => {
    const { duration, maxCount, overAnimate } = messageConfig
    const list = Object.values(destroyFun) // 卸载列表
    const isOver = list.length >= maxCount // 是否超长
    const key = id || Math.random().toString() // 记录卸载方法的唯一key
    const timeout: MutableRefObject<NodeJS.Timeout | null> = useRef(null) // 记录自动卸载的setTimeout，避免二次卸载
    const messageRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const [visible, setVisible] = useState(true)

    // 配置动画，如果超长并且overAnimate为false，则没有进场动画
    const classname = visible ? (isOver && !overAnimate ? '' : 'show') : 'hidden'

    // 卸载方法 取消挂载以及移除dom
    const unmount = () => {
        if (father && container) {
            unmountComponentAtNode(father)
            container.removeChild(father)
        }
    }

    // 执行隐藏动画 后 卸载 并 移除destroyFun
    const hidden_Unmount = (animate = true) => {
        if (animate) {
            const target = messageRef.current
            if (target !== null) {
                target.addEventListener('animationend', () => {
                    unmount()
                })
            }

            setVisible(false)
        } else {
            unmount()
        }

        delete destroyFun[key]
        if (timeout.current !== null) {
            clearTimeout(timeout.current)
        }
    }

    // 将卸载方法 保存在destroyFun
    // 并判断加入本方法后是否超过最大长度，如超过则执行最前面的卸载方法
    const addDestroyFun_JudgeOverMaxCount = () => {
        destroyFun[key] = hidden_Unmount

        if (isOver) {
            list[0](overAnimate)
        }
    }

    // 手动增加卸载方法
    useLayoutEffect(() => {
        addDestroyFun_JudgeOverMaxCount()
    }, [])

    // 自动卸载
    useEffect(() => {
        if (duration !== 0) {
            timeout.current = setTimeout(() => {
                hidden_Unmount()
            }, duration * 1000)
        }
    }, [])

    return (
        <div ref={messageRef} className={classnames('uik-message', classname)}>
            {type !== 'default' && <Icon name={type} className={classnames('uik-message-icon', type)} />}
            {content}
        </div>
    )
}

export default Message
