/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react'

type func<T> = (v: T) => void

// 防抖
function useDebounce<T>(func: func<T>, time: number): func<T> {
    const timeout = useRef<NodeJS.Timeout | null>(null)

    // 取消挂载后clear
    useEffect(() => {
        return () => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current)
            }
        }
    }, [])

    const resFun = (v: T) => {
        if (timeout.current !== null) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => func(v), time)
    }

    return resFun
}

export default useDebounce
