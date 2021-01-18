/* eslint-disable no-unused-vars */
import { useState } from 'react'

type v = anyArray
type setV = (v: v) => void
type res = [v, setV, setV]
type fun = (v: v) => res

// 存储引用类型数据存在问题
// 将数组储存为Set，提供add和del
const useStateArray: fun = (v) => {
    const [value, setValue] = useState(new Set(v))

    const addValue = (newV: v) => {
        if (!value.has(newV)) {
            const newSet = new Set(value)
            newSet.add(newV)
            setValue(newSet)
        }
    }

    const delValue = (newV: v) => {

        if (value.has(newV)) {
            const newSet = new Set(value)
            newSet.delete(newV)
            setValue(newSet)
        }
    }

    const resV = Array.from(value)

    return [resV, addValue, delValue]
}

export default useStateArray
