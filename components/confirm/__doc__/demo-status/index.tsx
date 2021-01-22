import React, { FC } from 'react'
import { Button } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <Button loading>loading</Button>
            <Button disabled>disabled</Button>
        </div>
    )
}

export default Demo
