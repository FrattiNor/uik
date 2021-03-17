import dayjs, { Dayjs } from 'dayjs'
import React, { FC, useEffect, useState } from 'react'
import { DatePicker } from 'uik'

const { RangPicker } = DatePicker

const Test: FC = () => {
    const [a, setA] = useState([dayjs(), dayjs().month(dayjs().month() + 1)])
    const [b, setB] = useState(1)

    useEffect(() => {
        
    }, [])

    return (
        <>
            <div style={{ margin: 24 }} onClick={() => console.log('C')}>
                <label onClick={() => console.log('B')}>
                    {/* <span onClick={() => console.log('A')}>AAAA</span> */}
                    <input type="checkbox" onClick={() => console.log('A')} value="AAA" />
                    AAA
                </label>
            </div>
        </>
    )
}

export default Test
