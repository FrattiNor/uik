/* eslint-disable no-unused-vars */
import { EffectCallback, useEffect, useState } from 'react'

type fun = (flag: boolean, func: () => void, depend: anyArray) => void

const useEffectOnce: fun = (flag, func, depend) => {
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (flag && !render) {
            setRender(true)
            func()
        }
    }, [depend])
}

export default useEffectOnce
