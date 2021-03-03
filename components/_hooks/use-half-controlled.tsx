/* eslint-disable no-unused-vars */
import { useState } from 'react'

type setV<T> = (v: T) => void

function useHalfControlled<T>(outV: T | undefined, outSetV: setV<T> | undefined, defaultV: T): [v: T, setV: setV<T>] {
    const [vitrualV, setVitrualV] = useState(defaultV)

    const v = outV !== undefined ? outV : vitrualV

    const setV = (v: T) => {
        if (outSetV) outSetV(v)
        setVitrualV(v)
    }

    return [v, setV]
}

export default useHalfControlled
