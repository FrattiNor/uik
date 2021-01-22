import React, { FC, useState, useRef, MutableRefObject, useEffect } from 'react'
import classnames from 'classnames'
import { useEffectTimeout, useStateFromValue } from '../../_hooks'
import { noticeProps, noticeHocProps } from './types'
import { getPositionStyle, autoAdjustPosition } from './util'
import './notice.less'

const noticeHoc = ({ backgroundColor }: noticeHocProps) => (WrapperComponent: FC<any>): FC<any> => {
    const Notice: FC<noticeProps> = (props) => {
        const { target, visible, position: outPosition = 'topCenter', trigger, setVisible, autoAdjust, rootId } = props
        const [count, setCount] = useState(0)
        const [position, setPosition] = useStateFromValue(outPosition)
        const [classname, setClassname] = useState(visible ? 'show' : 'hidden')
        const [show, setShow] = useState(!!visible)
        const [topLeftstyle, setTopLeftstyle] = useState({})
        const noticeRef: MutableRefObject<null | HTMLDivElement> = useRef(null)
        const baseStyle = { display: show ? 'block' : 'none' }
        const customStyle = { backgroundColor }

        const onMouseEnter = () => {
            if (trigger === 'hover') {
                setVisible(true)
            }
        }

        const onMouseLeave = () => {
            if (trigger === 'hover') {
                setVisible(false)
            }
        }

        useEffectTimeout(
            (connect) => {
                if (visible) {
                    setClassname('show')
                    setShow(true)
                } else {
                    setClassname('hidden')
                    connect(
                        setTimeout(() => {
                            setShow(false)
                            setClassname('')
                        }, 200)
                    )
                }
            },
            [visible]
        )

        useEffect(() => {
            if (show) {
                const { top, left, error } = getPositionStyle(position, target, noticeRef.current, rootId)

                // 限制调整次数
                if (autoAdjust && error && count < 5) {
                    setCount(count + 1)
                    const newPosition = autoAdjustPosition(position, error)
                    if (newPosition) {
                        setPosition(newPosition)
                    }
                } else {
                    setTopLeftstyle({ top, left })
                }
            }
        }, [position, target, noticeRef, show, autoAdjust, rootId, count])

        return (
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                ref={noticeRef}
                className={classnames('uik-notice', position)}
                style={{ ...baseStyle, ...topLeftstyle }}
            >
                <div className={classname}>
                    <div className="uik-notice-arrow">
                        <div className="uik-notice-arrow-content" style={customStyle} />
                    </div>
                    <div className="uik-notice-inner" style={customStyle}>
                        <WrapperComponent {...props} />
                    </div>
                </div>
            </div>
        )
    }

    return Notice
}

export default noticeHoc
