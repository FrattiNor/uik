import { useEffect } from 'react'

// 组件取消挂载时 自动clean掉
const useClearTimeout = (timeout: number): void => {
    useEffect(() => {
        return () => {
            clearTimeout(timeout)
        }
    }, [])
}

export default useClearTimeout
