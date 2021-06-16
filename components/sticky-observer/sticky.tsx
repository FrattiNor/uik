import React, { FC, useEffect, useRef, useState, CSSProperties } from 'react'
import { useResizeObserver } from '../_hooks'
import { stickyProps } from './types'

const Sticky: FC<stickyProps> = (props) => {
    const { children, rootId, getRoot, offsetTop, offsetBottom, style = {}, className, ...restProps } = props
    const targetOutRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)
    const [targetOutStyle, setTargetOutStyle] = useState<CSSProperties>({})
    const [targetStyle, setTargetStyle] = useState<CSSProperties>({})
    const [fixedStyle, setFixedStyle] = useState<CSSProperties>({})

    // 监测元素高宽
    useResizeObserver(targetRef.current, setTargetStyle)
    useResizeObserver(targetOutRef.current, setTargetOutStyle)

    // 监测是否可见
    useEffect(() => {
        // 默认 root 为 null，不存在root时，可见范围为视窗
        const root = getRoot ? getRoot() : rootId ? document.getElementById(rootId) : null
        const haveOffsetTop = typeof offsetTop === 'number'
        const haveOffsetBottom = typeof offsetBottom === 'number'
        const top = typeof offsetTop === 'number' ? -offsetTop : 0
        const bottom = typeof offsetBottom === 'number' ? -offsetBottom : 0

        const options = {
            root,
            rootMargin: `${top}px 0px ${bottom}px 0px`,
            threshold: 0.99 // 避免块级元素部分不可见
        }

        const callback = (entries: any) => {
            entries.forEach((entry: any) => {
                const { isIntersecting: canSee, boundingClientRect: targetRect, rootBounds: rootRect } = entry
                const fixedBaseStyle = { transform: 'translateZ(0px)', position: 'fixed', width: targetOutStyle.width, zIndex: 999 }

                if (canSee) {
                    setFixedStyle({})
                } else {
                    if (haveOffsetTop && targetRect.y <= rootRect.y) {
                        setFixedStyle({ ...fixedBaseStyle, top: rootRect.y, left: targetRect.x } as CSSProperties)
                    }
                    if (haveOffsetBottom && targetRect.y >= rootRect.y) {
                        setFixedStyle({
                            ...fixedBaseStyle,
                            top: rootRect.bottom - targetRect.height,
                            left: targetRect.x
                        } as CSSProperties)
                    }
                }
            })
        }

        const observer = new IntersectionObserver(callback, options)

        if (targetOutRef.current !== null) {
            observer.observe(targetOutRef.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [offsetTop, offsetBottom, rootId, getRoot, targetOutStyle.width])

    return (
        <div ref={targetOutRef} className={className} style={{ minHeight: targetStyle.height, ...style }} {...restProps}>
            <div ref={targetRef} style={fixedStyle}>
                {children}
            </div>
        </div>
    )
}

export default Sticky
