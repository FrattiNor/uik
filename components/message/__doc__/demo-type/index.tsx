import React, { FC } from 'react'
import { Button, message } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    const openMessage = (type: 'success' | 'error' | 'warn' | 'info') => message.open(`This is a ${type} message`, { type })

    return (
        <div className={styles['wrapper']}>
            <Button onClick={() => openMessage('success')}>success</Button>
            <Button onClick={() => openMessage('error')}>error</Button>
            <Button onClick={() => openMessage('warn')}>warn</Button>
            <Button onClick={() => openMessage('info')}>info</Button>
        </div>
    )
}

export default Demo
