import React, { FC } from 'react'
import { Radio, Checkbox } from 'uik'

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                <Radio.Group disabled defaultValue={'1'}>
                    <Radio key={1}>a</Radio>
                    <Radio key={2}>b</Radio>
                    <Radio key={3}>c</Radio>
                    <Radio key={4}>d</Radio>
                    <label key={5}>666</label>
                </Radio.Group>
                <Checkbox.Group>
                    <Checkbox>a</Checkbox>
                    <Checkbox>b</Checkbox>
                    <Checkbox>c</Checkbox>
                    <Checkbox>d</Checkbox>
                </Checkbox.Group>
            </div>
        </>
    )
}

export default Test
