/* eslint-disable no-unused-vars */
import { useState } from 'react'

type setV<T> = (v: T) => void
type res<T> = [v: T, setV: setV<T>]

// 判断使用的v，[outV, outSetV]是外界传入的v
// [vitrualV, setVitrualV]是内部创建的v
// v通过判断type的方式来确认使用outV还是vitrualV
function useHalfControlled<T>(outV: T | undefined, outSetV: setV<T> | undefined, defaultV: T, type?: string | ((v: T) => boolean)): res<T> {
    const [vitrualV, setVitrualV] = useState(defaultV)

    const judgeFromType = (vIn: T) => {
        if (!type) {
            return vIn
        }
        if (typeof type === 'function') {
            return type(vIn) ? vIn : vitrualV
        } else {
            return typeof vIn === type ? vIn : vitrualV
        }
    }
    // 存在outV并且没传type或者通过type检测，使用outV否则使用vitrualV
    const v = outV !== undefined ? judgeFromType(outV) : vitrualV

    const setV = (v: T) => {
        if (outSetV) outSetV(v)
        setVitrualV(v)
    }

    return [v, setV]
}

export default useHalfControlled
