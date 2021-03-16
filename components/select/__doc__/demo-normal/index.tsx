import React, { FC } from 'react'
import { Select } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <Select width={150} allowClear placeholder="请选择">
                <Select.Option value="111">1111</Select.Option>
                <Select.Option value="222">2222</Select.Option>
                <Select.Option value="333">3333</Select.Option>
            </Select>
            <Select width={150} allowClear placeholder="全部" textBefore="应用:">
                <Select.Option value="app1">应用1</Select.Option>
                <Select.Option value="app2">应用2</Select.Option>
                <Select.Option value="app3">应用3</Select.Option>
            </Select>
        </div>
    )
}

export default Demo
