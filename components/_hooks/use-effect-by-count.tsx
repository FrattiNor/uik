/* eslint-disable no-unused-vars */
import { useEffect, useState, EffectCallback } from 'react'

type fun = (func: EffectCallback, depend: anyArray, count: number) => void

const useEffectByCount: fun = (func, depend, count) => {
    const [num, setNum] = useState(0)

    useEffect(() => {
        if (num < count) {
            setNum(num + 1)
            func()
        }
    }, [...depend])
}

export default useEffectByCount
