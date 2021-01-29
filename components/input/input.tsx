import React, { FC, useState } from 'react'
import { inputProps } from './types'
import './input.less'

const Input: FC<inputProps> = () => {

    const [value, setValue] = useState("0")

    return <input type="range" min="0" max="100" value={value} onChange={e => setValue(e.target.value)} />
}

export default Input
