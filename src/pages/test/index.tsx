import React, { FC, useRef, useState } from 'react'
import { Confirm, Button, Modal } from 'uik'
import styles from './index.less'

const Test: FC = () => {
    const ref = useRef<HTMLDivElement>(null)

    const [root, setRoot] = useState(true)

    const change = () => {
        setRoot(!root)
    }

    return (
        <>
            <div className={styles['wrapper']} ref={ref}>
                <div className={styles['wrapper-inner']}>
                    <Confirm content="confirm ok?" getRoot={() => (root ? document.body : ref.current)}>
                        <Button type="primary">Button</Button>
                    </Confirm>
                    <Button onClick={change}>Button</Button>
                </div>
            </div>
            <div style={{ height: 2000 }} />
        </>
    )
}

export default Test
