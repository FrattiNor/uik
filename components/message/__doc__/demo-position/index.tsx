import React, { FC } from 'react'
import { Button, message } from 'uik'
import { messagePosition } from 'uik/message'
import styles from './index.less'

const Demo: FC = () => {
    const openMessage = (position: messagePosition) => {
        message.open(`这是一条message`, { position })
    }

    return (
        <>
            <div className={styles['wrapper']}>
                <Button onClick={() => openMessage('topLeft')}>TL</Button>
                <Button onClick={() => openMessage('topCenter')}>TC</Button>
                <Button onClick={() => openMessage('topRight')}>TR</Button>
            </div>
            <div className={styles['wrapper']}>
                <Button onClick={() => openMessage('bottomLeft')}>BL</Button>
                <Button onClick={() => openMessage('bottomCenter')}>BC</Button>
                <Button onClick={() => openMessage('bottomRight')}>BR</Button>
            </div>
        </>
    )
}

export default Demo
