import React, { FC } from 'react'
import { Select, Input } from 'uik'

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                <Select width={200} defaultValue="2" virtualList size="large" allowClear>
                    {Array(49)
                        .fill('')
                        .map((_, index) => (
                            <Select.Option key={index} value={index.toString()}>
                                <div>{index}AAA</div>
                            </Select.Option>
                        ))}
                </Select>
                <Input style={{ width: '100px', verticalAlign: 'top' }} size="large" />
            </div>
        </>
    )
}

export default Test
