/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useRef, MutableRefObject, useCallback } from 'react'

type refCurrent = NodeJS.Timeout | null
type Timeout = MutableRefObject<refCurrent>
type func = (change: (timeout: NodeJS.Timeout) => void) => void

// connect的timeout自动清理掉
const useTimeout = (fun: func, depend: anyArray): void => {
    const timeout: Timeout = useRef(null)

    const connectTimeout = (Timeout: NodeJS.Timeout) => {
        timeout.current = Timeout
    }

    const trucFun = useCallback(() => fun(connectTimeout), depend)

    useEffect(() => {
        trucFun()

        return () => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current)
            }
        }
    }, depend)
}

export default useTimeout
