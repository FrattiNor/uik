/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react'

type func<T> = (v: T) => void

// 防抖
function useDebounce<T>(func: func<T>, time: number): func<T> {
    const timeout = useRef<NodeJS.Timeout | null>(null)

    const clear = () => {
        if (timeout.current !== null) {
            clearTimeout(timeout.current)
        }
    }

    // 取消挂载后clear
    useEffect(() => {
        return () => {
            clear()
        }
    }, [])

    const resFun = (v: T) => {
        clear()
        timeout.current = setTimeout(() => func(v), time)
    }

    return resFun
}

export default useDebounce
