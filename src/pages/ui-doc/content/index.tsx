import React, { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import FormatMarkDown from '@/components/format-markdown'
import { getDoc } from '@/pages/ui-doc/menuList'
import styles from './index.less'

const Content: FC = () => {
    const location = useLocation()
    const { pathname, hash } = location
    const selectedName = pathname.replace('/uik/', '')
    const MD = getDoc(selectedName)

    useEffect(() => {
        const matchArray = hash.match(/srcoll_(.+)/)
        const anchorId = matchArray?.[1]
        if (anchorId) {
            const anchorDom = document.getElementById(decodeURIComponent(anchorId))
            if (anchorDom) {
                window.scrollTo({
                    top: anchorDom?.offsetTop + 80,
                    behavior: 'smooth'
                })
            }
        }
    }, [hash])

    return <FormatMarkDown className={styles['doc']}>{MD && <MD />}</FormatMarkDown>
}

export default Content
