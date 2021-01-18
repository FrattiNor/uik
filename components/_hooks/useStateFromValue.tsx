/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

type set<T> = (v: T) => void
type fun = <T>(v: T) => [T, set<T>]

// useState 根据 value 的值实时更新
const useStateFromValue: fun = (v) => {
    const [value, setValue] = useState(v)

    useEffect(() => {
        setValue(v)
    }, [v])

    return [value, setValue]
}

export default useStateFromValue
