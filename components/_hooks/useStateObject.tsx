/* eslint-disable no-unused-vars */
import { useState } from 'react'

type v = anyObject
type setV = (v: v) => void
type res = [v, setV]
type fun = (v: v) => res

// 不完全覆盖object的state，使用展开覆盖
const useStateObject: fun = (v) => {
    const [value, setValue] = useState(v)

    const changeValue = (newV: v) => {
        setValue({ ...value, ...newV })
    }

    return [value, changeValue]
}

export default useStateObject
