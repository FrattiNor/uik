import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.less'

const Header: FC<props> = ({ child }) => {
    const history = useHistory()

    const push = (path: string): void => {
        history.push(path)
    }

    return (
        <div className={styles['header']}>
            <div className={styles['left']}>
                UIK
            </div>
            <div className={styles['right']}>
                {child.map(({ path, title }) => (
                    <div className={styles['nav-item']} key={path} onClick={(): void => push(path)}>
                        {title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Header
