/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react'

type change<T> = (v: T) => Promise<T>
type fun = <T>(v: T) => [T, change<T>]

const useStatePromise: fun = (v) => {
    type typeV = typeof v
    const [value, setValue] = useState(v)
    const flag = useRef(false)

    useEffect(() => {
        flag.current = true
    }, [value])

    const setData = (newV: typeV) => {
        setValue(newV)
        return new Promise<typeV>((res) => {
            if (flag) {
                flag.current = false
                res(newV)
            }
        })
    }

    return [value, setData]
}

export default useStatePromise
