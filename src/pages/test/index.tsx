import React, { FC } from 'react'
import { Radio } from 'uik'

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                <Radio.Group>
                    <Radio value={'A'}>A</Radio>
                    <Radio value={'B'}>B</Radio>
                    <Radio value={'C'}>C</Radio>
                </Radio.Group>
            </div>
        </>
    )
}

export default Test
