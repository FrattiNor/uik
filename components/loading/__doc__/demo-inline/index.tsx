import React, { FC } from 'react'
import { Loading } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['card']}>
            <span>加载中</span>
            <Loading loading inline>
                Loading
            </Loading>
            <span>加载中</span>
        </div>
    )
}

export default Demo
