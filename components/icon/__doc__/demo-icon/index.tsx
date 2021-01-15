import React, { FC } from 'react'
import { Icon } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <Icon name="success" />
            <Icon name="error" />
            <Icon name="warn" />
            <Icon name="info" />
        </div>
    )
}

export default Demo
