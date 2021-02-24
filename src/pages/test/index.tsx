import React, { FC } from 'react'
import { Radio, Checkbox } from 'uik'

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                <Radio>a</Radio>
                <Radio>b</Radio>
                <Radio>c</Radio>
                <Radio>d</Radio>
                {/* <input type="radio" name="gender" id="6" />
                <label htmlFor="6">e</label>
                <input type="radio" name="gender" id="7" />
                <label htmlFor="7">f</label> */}
            </div>
        </>
    )
}

export default Test
