import React, { FC } from 'react'
import { Icon } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <Icon uik name="success" />
            <Icon uik name="error" />
            <Icon uik name="warn" />
            <Icon uik name="info" />
        </div>
    )
}

export default Demo
