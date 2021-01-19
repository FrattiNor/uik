import React, { FC, Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'
import Title from 'react-document-title'
import Sticky from 'react-sticky-el'
import { menu, getTitle, judgeName } from '@/doc_menu'
import styles from './index.less'

const Menu: FC = () => {
    const history = useHistory()
    const location = useLocation()

    const { pathname } = location
    const selectedName = pathname.replace('/uik/', '')

    const [pageTitle, setTitle] = useState('')

    // 跳转函数
    const push = (name: string): void => {
        window.scrollTo(0, 0)
        history.push(`/uik/${name}`)
    }

    // 如果没有选择，默认选择第一个
    useEffect(() => {
        if (!judgeName(selectedName)) {
            const FirstName = menu[0]?.components[0]?.name
            if (FirstName) push(FirstName)
        }
    }, [selectedName])

    // 设置title
    useEffect(() => {
        const title = getTitle(selectedName)
        setTitle(title)
    }, [selectedName])

    return (
        <Title title={pageTitle}>
            <Sticky className={styles['menu']}>
                {menu.map(({ title, components }) => {
                    return (
                        <Fragment key={title}>
                            <div className={styles['title']}>{title}</div>
                            <>
                                {components.map(({ desc, name }) => (
                                    <div
                                        onClick={(): void => push(name)}
                                        key={name}
                                        className={classnames(styles['text'], { [styles['selected']]: selectedName === name })}
                                    >
                                        {desc}
                                    </div>
                                ))}
                            </>
                        </Fragment>
                    )
                })}
            </Sticky>
        </Title>
    )
}

export default Menu
