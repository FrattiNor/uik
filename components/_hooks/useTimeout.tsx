/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useRef, MutableRefObject } from 'react'

const useTimeout = (): NodeJS.Timeout => {
    const defaultTimeout = (setTimeout(() => {}) as unknown) as NodeJS.Timeout

    const timeoutRef: MutableRefObject<NodeJS.Timeout> = useRef(defaultTimeout)

    const timeout = timeoutRef.current

    useEffect(() => {
        return () => {
            clearTimeout(timeout)
        }
    }, [timeout])

    return timeout
}

export default useTimeout
