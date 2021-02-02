import React, { FC } from 'react'
import { Icon } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <Icon defaultIcon name="success" />
            <Icon defaultIcon name="error" />
            <Icon defaultIcon name="warn" />
            <Icon defaultIcon name="info" />
        </div>
    )
}

export default Demo
