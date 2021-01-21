/* eslint-disable no-unused-vars */
import { useState } from 'react'

type add<T> = (v: T) => string
type del = (key: string) => void
type fun = <T>(v: T[]) => [{ [key: string]: T }, add<T>, del]

// 将数组转为object存储，key默认为随机数
const useStateArrayToObject: fun = (v) => {
    const obj: anyObject = {}

    v.forEach((item, i) => {
        obj[i] = item
    })

    const [value, setValue] = useState(obj)

    const addValue = (newV: any) => {
        const newKey = Math.random().toString()

        setValue({
            ...value,
            [newKey]: newV
        })

        return newKey
    }

    const delValue = (key: string) => {
        const newValue = { ...value }
        delete newValue[key]
        setValue(newValue)
    }

    return [value, addValue, delValue]
}

export default useStateArrayToObject
