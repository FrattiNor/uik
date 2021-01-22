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
        <>
            <div style={{ margin: 150, height: 500, width: 500, background: 'rgba(0,0,0,0.3)', overflow: 'auto', position: 'relative' }} id="coc">
                <div style={{ margin: 50, height: 1000, width: 1000 }}>
                    <Tooltip autoAdjust rootId="coc" title={<div style={{ height: 20, width: 100 }}>777787777</div>}>
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
            </div>
        </>
    )
}

export default Test
