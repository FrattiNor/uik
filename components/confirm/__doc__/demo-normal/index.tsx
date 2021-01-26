import React, { FC, Fragment, useState } from 'react'
import { Button, Confirm, message } from 'uik'

const Demo: FC = () => {
    const [visible, setVisible] = useState(false)

    // console.log('v', visible)

    const confirm = () => {
        message.open('你点击了确认', { type: 'success' })
        setVisible(false)
    }

    const cancel = () => {
        message.open('你点击了取消', { type: 'error' })
        setVisible(false)
    }

    return (
        <Fragment>
            <Confirm
                content="确认弹窗，你确认要关闭吗？"
                visible={visible}
                onConfrim={confirm}
                onCancel={cancel}
                onVisibleChange={(v) => setVisible(v)}
            >
                <Button>点击触发弹窗</Button>
            </Confirm>
        </Fragment>
    )
}

export default Demo
