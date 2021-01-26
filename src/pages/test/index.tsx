import React, { FC, useState, useRef } from 'react'
import { Button, Confirm } from 'uik'

const Test: FC = () => {
    const [v, setV] = useState(false)

    const btn1 = () => {
        setV(!v)
    }

    const ref = useRef(null)

    return (
        <>
            <div ref={ref} style={{ margin: 150, height: 500, width: 500, background: 'rgba(0,0,0,0.3)', overflow: 'auto', position: 'relative' }} id="coc">
                <div style={{ margin: 50, height: 1000, width: 1000 }}>
                    <Confirm getRoot={() => ref.current} autoAdjust content="kalsjldkajslkfjlakjflshfklajskld">
                        <Button type="primary" onClick={btn1}>
                            Loading
                        </Button>
                    </Confirm>
                    <Confirm getRoot={() => ref.current} autoAdjust content="kalsjldkajslkfjlakjflshfklajskld">
                        <Button type="primary" onClick={btn1}>
                            Loading
                        </Button>
                    </Confirm>
                </div>
            </div>
        </>
    )
}

export default Test
