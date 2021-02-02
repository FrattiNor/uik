import React, { FC, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { unmountComponentAtNode } from 'react-dom'
import classnames from 'classnames'
import Icon from '../icon'
import { _messageConfig, destroyFun } from './api'
import { messageProps } from './types'
import './message.less'

// Message组件
const Message: FC<messageProps> = (props) => {
    const {CloseIcon} = Icon
    const { div, container, title, type = 'default', id, duration: propsDuration, showClose = false, desc, width } = props
    const { duration: configDuration, maxCount, overAnimate } = _messageConfig
    // 延迟关闭
    const duration = typeof propsDuration === 'number' ? propsDuration : configDuration
    // 卸载列表
    const list = Object.values(destroyFun)
    // 是否超长
    const isOver = list.length >= maxCount
    // 记录卸载方法的唯一key
    const key = id || Math.random().toString()
    // 记录自动卸载的setTimeout，避免二次卸载
    const timeout = useRef<NodeJS.Timeout | null>(null)
    const messageRef = useRef<HTMLDivElement>(null)
    // visible默认显示
    const [visible, setVisible] = useState(true)

    // 配置动画，如果超长并且overAnimate为false，则没有进场动画
    const classname = visible ? (isOver && !overAnimate ? '' : 'show') : 'hidden'

    // 卸载方法 取消挂载以及移除dom
    const unmount = () => {
        unmountComponentAtNode(div)
        container.removeChild(div)
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
        <div ref={messageRef} className={classnames('uik-message', classname)} style={{ width }}>
            <div className="uik-message-title">
                <div className="uik-message-left">
                    {type !== 'default' && <Icon defaultIcon name={type} className={classnames('uik-message-title-icon', type)} />}
                    {title}
                </div>
                {showClose && <CloseIcon size="small" className="uik-message-title-close" onClick={() => hidden_Unmount()} />}
            </div>
            {desc && <div className="uik-message-desc">{desc}</div>}
        </div>
    )
}

export default Message
