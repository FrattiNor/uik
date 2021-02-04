import React, { FC, useEffect, useRef, useState, useCallback, CSSProperties } from 'react'
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

    // 监控滚动事件
    const scrollFun = useCallback(
        (root: HTMLElement | Document) => {
            const haveOffsetTop = typeof offsetTop === 'number'
            const haveOffsetBottom = typeof offsetBottom === 'number'
            const top = typeof offsetTop === 'number' ? offsetTop : 0
            const bottom = typeof offsetBottom === 'number' ? offsetBottom : 0

            if (targetOutRef.current !== null) {
                const targetRect = targetOutRef.current.getBoundingClientRect()
                const rootRect = root === document ? { x: 0, y: 0, height: window.innerHeight } : (root as HTMLElement).getBoundingClientRect()
                const fixedBaseStyle = { transform: 'translateZ(0px)', position: 'fixed', width: targetOutStyle.width, zIndex: 999 }

                if (haveOffsetTop && targetRect.y < rootRect.y + top) {
                    setFixedStyle({ ...fixedBaseStyle, top: rootRect.y + top, left: targetRect.x } as CSSProperties)
                } else if (haveOffsetBottom && targetRect.y > rootRect.y + rootRect.height - bottom) {
                    setFixedStyle({
                        ...fixedBaseStyle,
                        top: rootRect.y + rootRect.height - targetRect.height - bottom,
                        left: targetRect.x
                    } as CSSProperties)
                } else {
                    setFixedStyle({})
                }
            }
        },
        [offsetBottom, offsetTop, targetOutStyle.width]
    )

    // 添加滚动事件
    useEffect(() => {
        const _root = getRoot ? getRoot() : rootId ? document.getElementById(rootId) : null
        const root = _root === null ? document : _root
        const getFixed = () => scrollFun(root)

        getFixed()
        root.addEventListener('scroll', getFixed)

        return () => {
            root.removeEventListener('scroll', getFixed)
        }
    }, [getRoot, rootId, scrollFun])

    return (
        <div ref={targetOutRef} className={className} style={{ minHeight: targetStyle.height, ...style }} {...restProps}>
            <div ref={targetRef} style={fixedStyle}>
                {children}
            </div>
        </div>
    )
}

export default Sticky
