import React, { FC, useState } from 'react'
import { Button, Tooltip, Modal, message, Confirm, Icon } from 'uik'

const Test: FC = () => {
    const [v, setV] = useState(false)

    const btn1 = () => {
        setV(!v)
    }

    return (
        <>
            <div style={{ margin: 150, height: 500, width: 500, background: 'rgba(0,0,0,0.3)', overflow: 'auto', position: 'relative' }} id="coc">
                <div style={{ margin: 50, height: 1000, width: 1000 }}>
                    <Confirm autoAdjust content="kalsjldkajslkfjlakjflshfklajskld">
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
