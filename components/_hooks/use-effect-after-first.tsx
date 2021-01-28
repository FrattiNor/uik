/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

// 第一次不执行的useEffect
const useEffectAfterFirst = (fun: () => void, depend: anyArray): void => {
    const [first, setFirst] = useState(true)

    useEffect(() => {
        if (first) {
            setFirst(!first)
        } else {
            fun()
        }
    }, depend)
}

export default useEffectAfterFirst
