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
            <Tooltip title="777">
                <Button type="primary" onClick={btn1}>
                    Loading
                </Button>
            </Tooltip>

            <Modal visible={v} onCancel={() => setV(false)}>
                <Tooltip title="888">
                    <Button type="primary" onClick={btn2}>
                        Loading
                    </Button>
                </Tooltip>
            </Modal>
        </div>
    )
}

export default Test
