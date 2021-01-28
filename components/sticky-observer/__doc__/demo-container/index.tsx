import React, { FC, useRef } from 'react'
import { Button, Sticky } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null)

    return (
        <div className={styles['wrapper']} ref={wrapperRef}>
            <div className={styles['wrapper-inner']}>
                <Sticky offsetTop={10} getRoot={() => wrapperRef.current}>
                    <Button type="primary">Sticky</Button>
                </Sticky>
            </div>
        </div>
    )
}

export default Demo
