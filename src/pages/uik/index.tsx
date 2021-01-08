import React, { FC } from 'react'
import Menu from './menu'
import Content from './content'
import styles from './index.less'

const UIK: FC = () => {
    return (
        <div className={styles['uik']}>
            <Menu />
            <Content />
        </div>
    )
}

export default UIK
