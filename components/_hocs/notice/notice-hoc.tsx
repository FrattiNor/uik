import React, { FC, useState, useRef, Fragment, useEffect } from 'react'
import classnames from 'classnames'
import { useEffectTimeout, useStateFromValue } from '../../_hooks'
import { noticeProps, noticeHocInnerComponent, noticeHocComponent } from './types'
import { getPositionStyle, autoAdjustPosition } from './util'
import './notice.less'

// 获取参数
const noticeHoc: noticeHocComponent = ({ backgroundColor, emptyKey, needArrow = true, defaultPosition = 'topCenter', isDropdown = false }) => {
    // 获取组件
    const noticeHocInner: noticeHocInnerComponent = (WrapperComponent) => {
        // 修改组件
        const Notice: FC<noticeProps> = (props) => {
            const _props = props as anyObject
            // 获取是否为空
            const isEmpty = emptyKey ? !_props[emptyKey] : false
            //
            const {
                visible,
                position: outPosition = defaultPosition,
                trigger,
                setVirtualVisible,
                autoAdjust,
                root,
                container,
                target,
                popSameWidth
            } = props
            // 使用的定位，根据外部传入和内部自动调整获得
            const [position, setPosition] = useStateFromValue(outPosition)
            // 承载动画的类名
            const [animateClassname, setAnimateClassname] = useState(visible ? 'show' : 'hidden')
            // 是否展示
            const [show, setShow] = useState(!!visible)
            // notice的top，left定位
            const [topLeftstyle, setTopLeftstyle] = useState({})
            // notice本身的ref
            const noticeRef = useRef<HTMLDivElement>(null)
            // 基础样式
            const baseStyle = { display: show ? 'block' : 'none', minWidth: popSameWidth ? target?.clientWidth : undefined }
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
            // trigger 为 click 时，点击空白关闭弹窗
            useEffect(() => {
                const clickClose = (event: MouseEvent) => {
                    const notice = noticeRef.current
                    const clickNode = event.target as Node
                    // 点击其他区域时, 隐藏指定区域
                    // 点击区域不为children，点击区域不为弹出部分，点击区域不为弹出部分的子元素
                    if (target !== null && notice !== null && clickNode !== null) {
                        if (!(target === clickNode || notice === clickNode || notice.contains(clickNode))) {
                            setVirtualVisible(false)
                        }
                    }
                }

                if (trigger === 'click') {
                    document.addEventListener('click', clickClose)
                }

                return () => {
                    document.removeEventListener('click', clickClose)
                }
            }, [setVirtualVisible, target, trigger])

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
                                // setAnimateClassname('')
                            }, 200)
                        )
                    }
                },
                [visible]
            )

            // 根据 autoAdjust 和 position 获取 调整后的position 和 top left
            useEffect(() => {
                if (show) {
                    // 根据 定位 目标元素 notice本身 容器节点 根节点 获取 top left 和 是否存在遮挡
                    const { top, left, error } = getPositionStyle(position, target, noticeRef.current, root, container)

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
            }, [position, target, show, autoAdjust, container, root, setPosition])

            return !isEmpty ? (
                <div
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    ref={noticeRef}
                    className={classnames('uik-notice', position, { 'no-arrow': !needArrow, 'is-dropdown': isDropdown })}
                    style={{ ...baseStyle, ...topLeftstyle }}
                >
                    <div className={classnames('uik-notice-inner', animateClassname)} style={backgroundColorStyle}>
                        {needArrow && (
                            <div className="uik-notice-arrow">
                                <div className="uik-notice-arrow-content" style={backgroundColorStyle} />
                            </div>
                        )}
                        <WrapperComponent {...props} setVirtualVisible={setVirtualVisible} />
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
