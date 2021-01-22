import React, { FC } from 'react'
import Header from './header'
import styles from './index.less'

// 基础的layout，负责构建基本框架
const BasicLayout: FC<props> = ({ children, child }) => {
    return (
        <>
            <Header child={child} />
            <div className={styles['content']}>{children}</div>
        </>
    )
}

export default BasicLayout
