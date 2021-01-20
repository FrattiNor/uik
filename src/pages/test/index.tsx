import React, { FC, useRef, useState } from 'react'
import { Button, Tooltip, Modal, message, Icon } from 'uik'

const Test: FC = () => {
    const b = useRef()
    const [v, setV] = useState(false)

    return (
        <div style={{ margin: 15, height: 1000 }}>
            <Tooltip visible={v} title="666">
                <Button ref={b}>Loading</Button>
            </Tooltip>
            <Modal>
                <Button>Loading</Button>
            </Modal>
        </div>
    )
}

export default Test
