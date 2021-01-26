import React, { FC, useState, useRef } from 'react'
import { Button, DropDown } from 'uik'

const Test: FC = () => {
    const [v, setV] = useState(false)

    const btn1 = () => {
        setV(!v)
    }

    const ref = useRef(null)

    const list = [
        {
            name: '1st menu item',
            key: '111'
        },
        {
            name: '1st menu item',
            key: '222'
        }
    ]

    return (
        <>
            <div
                ref={ref}
                style={{ margin: 150, height: 500, width: 500, background: 'rgba(0,0,0,0.3)', overflow: 'auto', position: 'relative' }}
                id="coc"
            >
                <div style={{ margin: 50, height: 1000, width: 1000 }}>
                    <DropDown visible getRoot={() => ref.current} autoAdjust overlay={list}>
                        <Button type="primary" onClick={btn1}>
                            Loading
                        </Button>
                    </DropDown>
                </div>
            </div>
        </>
    )
}

export default Test
