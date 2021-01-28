/* eslint-disable @typescript-eslint/no-explicit-any */
import { EffectCallback, useEffect, useState, useCallback } from 'react'

// 第一次不执行的useEffect
const useEffectAfterFirst = (fun: EffectCallback, depend: anyArray): void => {
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
