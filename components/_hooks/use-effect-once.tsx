/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

type fun = (flag: boolean, func: () => void, depend: anyArray) => void

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
