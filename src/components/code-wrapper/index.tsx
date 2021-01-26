import React, { FC } from 'react'
import styles from './index.less'

const CodeWrapper: FC = ({ children }) => {
    const list = Array.isArray(children) ? children : [children]
    const listOne = list.filter((_, i) => i % 2 === 0)
    const listTwo = list.filter((_, i) => i % 2 === 1)

    return (
        <div className={styles['code-wrapper']}>
            <div className={styles['code-wrapper-item']}>{listOne}</div>
            <div className={styles['code-wrapper-item']}>{listTwo}</div>
        </div>
    )
}

export default CodeWrapper
