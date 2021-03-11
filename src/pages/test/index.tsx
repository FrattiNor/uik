import dayjs, { Dayjs } from 'dayjs'
import React, { FC } from 'react'
import { DatePicker } from 'uik'

const { RangPicker, TimePicker } = DatePicker

const Test: FC = () => {

    const clicka = () => {
        console.log('a')
    }

    const clicka2 = () => {
        console.log('a2')
    }

    const clickb = () => {
        console.log('b')
    }

    const clickb2 = () => {
        console.log('b2')
    }

    const clickc = (e: MouseEvent) => {
        // e.stopPropagation()
        e.preventDefault()
        console.log('c')
    }

    const clickc2 = () => {
        console.log('c2')
    }

    return (
        <>
            <div style={{ margin: 24 }}>
                {/* <RangPicker />
                <DatePicker disabledDate={(day: Dayjs | string) => (day as Dayjs).valueOf() > dayjs().valueOf()} /> */}
                <RangPicker error allowClear />



                <div onClick={clicka} onClickCapture={clicka2}>
                    <div onClick={clickb} onClickCapture={clickb2}>
                        <div onClick={clickc} onClickCapture={clickc2}>123</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Test
