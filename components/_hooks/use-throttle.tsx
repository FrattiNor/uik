/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react'

type func<T> = (v: T) => void

// 节流
function useThrottle<T>(func: func<T>, time: number): func<T> {
    const timeout = useRef<NodeJS.Timeout | null>(null)
    const flag = useRef(true)

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
        if (flag.current) {
            func(v)
            flag.current = false
            timeout.current = setTimeout(() => {
                flag.current = true
            }, time)
        }
    }

    return resFun
}

export default useThrottle
