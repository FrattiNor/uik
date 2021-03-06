import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import FormatMarkDown from '@/components/format-markdown'
import { getDoc } from '@/doc-menu'
import styles from './index.less'

const Content: FC = () => {
    const location = useLocation()
    const { pathname } = location
    const selectedName = pathname.replace('/uik/', '')
    const MD = getDoc(selectedName)

    return (
        <FormatMarkDown className={styles['doc']}>
            {MD && <MD />}
        </FormatMarkDown>
    )
}

export default Content
