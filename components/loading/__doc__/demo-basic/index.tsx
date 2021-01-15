import React, { FC } from 'react'
import { Loading } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <Loading loading>
            <div className={styles['card']}>加载中</div>
        </Loading>
    )
}

export default Demo
