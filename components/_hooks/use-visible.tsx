/* eslint-disable no-unused-vars */
import { useState } from 'react'

type setV = (v: boolean) => void

const useVisible = (outVisible: boolean | undefined, outSetVisible: setV | undefined, defaultVisible?: boolean): [v: boolean, setV: setV] => {
    const [vitrualVisible, setVitrualVisible] = useState(defaultVisible || false)

    const visible = outVisible !== undefined ? outVisible : vitrualVisible

    const setVisible = (v: boolean) => {
        if (outSetVisible) outSetVisible(v)
        setVitrualVisible(v)
    }

    return [visible, setVisible]
}

export default useVisible
