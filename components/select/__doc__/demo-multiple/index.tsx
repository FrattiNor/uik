import React, { FC } from 'react'
import { Select } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <Select width={230} multiple allowClear placeholder="请选择">
                <Select.Option value="111">1111</Select.Option>
                <Select.Option value="222">2222</Select.Option>
                <Select.Option value="333">3333</Select.Option>
            </Select>
            <Select width={230} multiple allowClear placeholder="全部" textBefore="应用:">
                <Select.Option value="app1">应用1</Select.Option>
                <Select.Option value="app2">应用2</Select.Option>
                <Select.Option value="app3">应用3</Select.Option>
            </Select>
            <Select width={230} multiple allowClear placeholder="全部" textBefore="应用:" multipleShow="line">
                <Select.Option value="app1">应用1</Select.Option>
                <Select.Option value="app2">应用2</Select.Option>
                <Select.Option value="app3">应用3</Select.Option>
                <Select.Option value="app4">应用4</Select.Option>
                <Select.Option value="app5">应用5</Select.Option>
                <Select.Option value="app6">应用6</Select.Option>
            </Select>
            <Select width={230} multiple allowClear placeholder="全部" textBefore="应用:" multipleShow="line" checkBoxItem>
                <Select.Option value="app1">应用1</Select.Option>
                <Select.Option value="app2">应用2</Select.Option>
                <Select.Option value="app3">应用3</Select.Option>
                <Select.Option value="app4">应用4</Select.Option>
                <Select.Option value="app5">应用5</Select.Option>
                <Select.Option value="app6">应用6</Select.Option>
            </Select>
        </div>
    )
}

export default Demo
