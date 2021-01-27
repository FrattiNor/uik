import React, { FC, useRef, useState } from 'react'
import { Sticky, Button, Tooltip } from 'uik'

const Test: FC = () => {
    const ref = useRef(null)

    const [b, setB] = useState(true)
    const [a, setA] = useState(10)

    const click = () => {
        setB(!b)
        console.log(a === 10 ? 100 : 10)
        setA(a === 10 ? 100 : 10)
    }

    return (
        <>
            {/* <Sticky offsetTop={a} getRoot={() => ref.current}>
                <Button type="primary">Button3</Button>
            </Sticky> */}
            <div
                ref={ref}
                style={{
                    height: 500,
                    width: 500,
                    padding: 24,
                    margin: 24,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    overflow: 'auto',
                    position: 'relative'
                }}
            >
                <Tooltip autoAdjust title="666" getRoot={() => (b ? ref.current : document.body)}>
                    <Button type="primary">Button1</Button>
                </Tooltip>
                <Button type="primary" onClick={click}>
                    Button2
                </Button>
                <Sticky offsetTop={a} getRoot={() => ref.current}>
                    <Button type="primary">
                        Button3
                    </Button>
                </Sticky>
                <div style={{ width: 2500, height: 2500 }} />
            </div>
        </>
    )
}

export default Test
