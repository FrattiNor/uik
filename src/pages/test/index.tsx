import React, { FC, useRef, useState } from 'react'
import { StickyObserver, Button } from 'uik'
import styles from './index.less'

const Test: FC = () => {
    const [text, setText] = useState('Sticky')
    const ref = useRef<HTMLDivElement>(null)

    const change = () => {
        setText(text === 'Sticky' ? 'StickySticky' : 'Sticky')
    }

    return (
        <>
            <div className={styles['wrapper']} ref={ref}>
                <div className={styles['wrapper-inner']}>
                    <StickyObserver offsetTop={10}>
                        <Button type="primary">{text}</Button>
                    </StickyObserver>
                </div>
            </div>
            <div style={{ height: 2000 }}></div>
            {/* <div style={{ height: 2000 }}></div>
            <Sticky offsetBottom={10}>
                <Button type="primary">Sticky</Button>
            </Sticky>
            <div style={{ height: 2000 }}></div> */}
        </>
    )
}

export default Test
