import React, { FC, Fragment, useState } from 'react'
import { Progress, Button } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    const [percent, setPercent] = useState(50)

    const add = () => {
        setPercent(percent + 10)
    }

    const del = () => {
        setPercent(percent - 10)
    }

    return (
        <Fragment>
            <Progress percent={percent} />
            <div className={styles['btn-box']}>
                <Button type="primary" onClick={add}>add</Button>
                <Button type="danger" onClick={del}>del</Button>
            </div>
        </Fragment>
    )
}

export default Demo
