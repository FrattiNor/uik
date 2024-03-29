import React, { FC, useState } from 'react'
import { Button, Modal } from 'uik'
import { modalPosition } from 'uik/modal'
import styles from './index.less'

const Demo: FC = () => {
    const [visible, setVisible] = useState(false)
    const [position, setPosition] = useState<modalPosition>('center')

    const open = (p: modalPosition) => {
        setPosition(p)
        setVisible(true)
    }

    return (
        <div className={styles['wrapper']}>
            <Button onClick={() => open('center')}>center</Button>
            <Button onClick={() => open('top')}>top</Button>
            <Button onClick={() => open('bottom')}>bottom</Button>
            <Button onClick={() => open('left')}>left</Button>
            <Button onClick={() => open('right')}>right</Button>
            <Modal visible={visible} title="弹窗标题" onCancel={() => setVisible(false)} position={position}>
                <p>弹窗内容...</p>
                <p>弹窗内容...</p>
            </Modal>
        </div>
    )
}

export default Demo
