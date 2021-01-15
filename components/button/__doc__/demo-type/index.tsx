import React, { FC } from 'react'
import { Button } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <Button type="default">default</Button>
            <Button type="primary">primary</Button>
            <Button type="danger">danger</Button>
        </div>
    )
}

export default Demo
