import React, { FC } from 'react'
import { useHistory } from 'react-router'
import styles from './index.less'

const ALink: FC<{ pathname: string; hash?: string }> = ({ children, pathname, hash }) => {
    const history = useHistory()

    const pushFun = () => {
        history.push({ pathname, hash })
    }

    return (
        <a className={styles['a']} onClick={pushFun}>
            {children}
        </a>
    )
}

export default ALink
