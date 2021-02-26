import React, { FC } from 'react'
import { Radio } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <Radio.Group className={styles['radio-group']}>
            <Radio value={'A'}>A</Radio>
            <Radio value={'B'}>B</Radio>
            <Radio value={'C'}>C</Radio>
        </Radio.Group>
    )
}

export default Demo
