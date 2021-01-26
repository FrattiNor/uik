import React, { FC } from 'react'
import { Button, message } from 'uik'
import { messagePosition } from 'uik/lib/message'
import styles from './index.less'

const Demo: FC = () => {
    const openMessage = (position: messagePosition) => {
        message.open(`这是一条message`, { position })
    }

    return (
        <>
            <div className={styles['wrapper']}>
                <Button onClick={() => openMessage(['top', 'left'])}>TL</Button>
                <Button onClick={() => openMessage(['top', 'center'])}>TC</Button>
                <Button onClick={() => openMessage(['top', 'right'])}>TR</Button>
            </div>
            <div className={styles['wrapper']}>
                <Button onClick={() => openMessage(['bottom', 'left'])}>BL</Button>
                <Button onClick={() => openMessage(['bottom', 'center'])}>BC</Button>
                <Button onClick={() => openMessage(['bottom', 'right'])}>BR</Button>
            </div>
        </>
    )
}

export default Demo
