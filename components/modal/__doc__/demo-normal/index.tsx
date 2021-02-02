import React, { FC, Fragment, useState } from 'react'
import { Button, Modal } from 'uik'

const Demo: FC = () => {
    const [visible, setVisible] = useState(false)

    return (
        <Fragment>
            <Button type="primary" onClick={() => setVisible(true)}>基本弹窗</Button>
            <Modal visible={visible} title="弹窗标题" onCancel={() => setVisible(false)}>
                <p>弹窗内容...</p>
                <p>弹窗内容...</p>
            </Modal>
        </Fragment>
    )
}

export default Demo
