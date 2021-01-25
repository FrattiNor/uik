/* eslint-disable no-unused-vars */
import React, { FC, useState, useRef, MutableRefObject, Fragment } from 'react'
import classnames from 'classnames'
import { useEffectTimeout, useStateFromValue, useEffectByCount } from '../../_hooks'
import { noticeProps, noticeHocInnerComponent, noticeHocComponent } from './types'
import { getPositionStyle, autoAdjustPosition } from './util'
import './notice.less'

// 获取参数
const noticeHoc: noticeHocComponent = ({ backgroundColor, emptyKey }) => {
    // 获取组件
    const noticeHocInner: noticeHocInnerComponent = (WrapperComponent) => {
        // 修改组件
        const Notice: FC<noticeProps> = (props) => {
            const _props = props as anyObject
            // 获取是否为空
            const isEmpty = emptyKey ? !_props[emptyKey] : false
            // 
            const { target, visible, position: outPosition = 'topCenter', trigger, setVirtualVisible, autoAdjust, rootId, containerId } = props
            // 使用的定位，根据外部传入和内部自动调整获得
            const [position, setPosition] = useStateFromValue(outPosition)
            // 承载动画的类名
            const [animateClassname, setAnimateClassname] = useState(visible ? 'show' : 'hidden')
            // 是否展示
            const [show, setShow] = useState(!!visible)
            // notice的top，left定位
            const [topLeftstyle, setTopLeftstyle] = useState({})
            // notice本身的ref
            const noticeRef: MutableRefObject<null | HTMLDivElement> = useRef(null)
            // 基础样式
            const baseStyle = { display: show ? 'block' : 'none' }
            // 外部传入的backgroundColor样式
            const backgroundColorStyle = { backgroundColor }

            // 鼠标移入
            const onMouseEnter = () => {
                if (trigger === 'hover') {
                    setVirtualVisible(true)
                }
            }
            // 鼠标移出
            const onMouseLeave = () => {
                if (trigger === 'hover') {
                    setVirtualVisible(false)
                }
            }

            // 根据visible设置动画和展示
            useEffectTimeout(
                (connect) => {
                    if (visible) {
                        setAnimateClassname('show')
                        setShow(true)
                    } else {
                        setAnimateClassname('hidden')
                        connect(
                            setTimeout(() => {
                                setShow(false)
                                setAnimateClassname('')
                            }, 200)
                        )
                    }
                },
                [visible]
            )

            // 根据 autoAdjust 和 position 获取 调整后的position 和 top left
            // 设置调整次数为5次，避免出现无限调整定位的bug
            useEffectByCount(
                () => {
                    if (show) {
                        // 根据 定位 目标元素 notice本身 容器节点 根节点 获取 top left 和 是否存在遮挡
                        const { top, left, error } = getPositionStyle(position, target, noticeRef.current, containerId, rootId)

                        if (autoAdjust && error) {
                            // 根据 存在遮挡的error 和 当前定位 进行 定位调整
                            const newPosition = autoAdjustPosition(position, error)

                            if (newPosition) {
                                setPosition(newPosition)
                            }
                        } else {
                            setTopLeftstyle({ top, left })
                        }
                    }
                },
                [position, target, noticeRef, show, autoAdjust, rootId, containerId],
                5
            )

            return !isEmpty ? (
                <div
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    ref={noticeRef}
                    className={classnames('uik-notice', position)}
                    style={{ ...baseStyle, ...topLeftstyle }}
                >
                    <div className={classnames('uik-notice-inner', animateClassname)} style={backgroundColorStyle}>
                        <div className="uik-notice-arrow">
                            <div className="uik-notice-arrow-content" style={backgroundColorStyle} />
                        </div>
                        <WrapperComponent {...props} />
                    </div>
                </div>
            ) : (
                <Fragment />
            )
        }

        return Notice
    }

    return noticeHocInner
}

export default noticeHoc
