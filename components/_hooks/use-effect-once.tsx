/* eslint-disable no-unused-vars */
import { EffectCallback, useEffect, useState } from 'react'

type fun = (flag: boolean, func: EffectCallback, depend: anyArray) => void

const useEffectOnce: fun = (flag, func, depend) => {
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (flag && !render) {
            func()
            setRender(true)
        }
    }, [depend, flag, func, render])
}

export default useEffectOnce
