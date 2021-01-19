import React, { FC, Fragment, useState } from 'react'
import { Button, Modal } from 'uik'

const Demo: FC = () => {
    const [visible, setVisible] = useState(false)

    return (
        <Fragment>
            <Button onClick={() => setVisible(true)}>基本弹窗</Button>
            <Modal visible={visible} title="Basic Modal" onCancel={() => setVisible(false)}>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </Fragment>
    )
}

export default Demo
