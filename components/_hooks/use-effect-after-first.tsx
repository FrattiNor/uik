/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react'

type returnFun = () => void
type func = () => returnFun | void

// 第一次不执行的useEffect
const useEffectAfterFirst = (fun: func, depend: anyArray): void => {
    const [first, setFirst] = useState(true)

    const trucFun = useCallback(() => fun(), depend)

    useEffect(() => {
        if (first) {
            setFirst(!first)
        } else {
            trucFun()
        }
    }, depend)
}

export default useEffectAfterFirst
