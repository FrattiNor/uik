/* eslint-disable no-unused-vars */
import ResizeObserver from 'resize-observer-polyfill'
import { CSSProperties, useEffect } from 'react'

type fun = (target: HTMLElement | null, setStyle: (style: CSSProperties) => void, depend?: anyArray) => void

const useEffectResizeObserver:fun = (target, setStyle, depend = []) => {
    // 监测元素高宽
    useEffect(() => {
        const callback = (entries: any) => {
            entries.forEach((entry: any) => {
                setStyle({
                    height: entry.contentRect.height,
                    width: entry.contentRect.width
                })
            })
        }

        const observer = new ResizeObserver(callback)

        if (target !== null) {
            observer.observe(target)
        }

        return () => {
            observer.disconnect()
        }
    }, [...depend, setStyle, target])
}

export default useEffectResizeObserver
