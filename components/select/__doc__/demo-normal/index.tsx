import React, { FC } from 'react'
import { Select } from 'uik'

const Demo: FC = () => {
    return (
        <Select width={200}>
            <Select.Option value="111">1111</Select.Option>
            <Select.Option value="222">2222</Select.Option>
            <Select.Option value="333">3333</Select.Option>
        </Select>
    )
}

export default Demo
