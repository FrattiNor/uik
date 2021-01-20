import React, { FC, useState } from 'react'
import { Button, Tooltip, Modal, message } from 'uik'

const Test: FC = () => {
    const [v, setV] = useState(false)
    const [v2, setV2] = useState(false)


    const btn1 = () => {
        setV(!v)
    }

    const btn2 = () => {
        setV2(!v2)
        message.open('666', { type: 'info' })
    }

    return (
        <div style={{ margin: 15, height: 1000 }}>
            <Button type="primary" onClick={btn1}>
                Loading
            </Button>

            <Modal visible={v} onCancel={() => setV(false)}>
                <Tooltip visible={v2} title="666">
                    <Button type="primary" onClick={btn2}>
                        Loading
                    </Button>
                </Tooltip>
                {/* <Modal visible={v2} onCancel={() => setV2(false)}>
                    6666
                </Modal> */}
            </Modal>
        </div>
    )
}

export default Test
