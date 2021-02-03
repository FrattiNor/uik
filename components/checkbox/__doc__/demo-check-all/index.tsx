import React, { FC, Fragment, useState } from 'react'
import { Checkbox } from 'uik'
import styles from './index.less'

const { Group } = Checkbox

const Demo: FC = () => {
    const [checkedLsit, setCheckedList] = useState(['A'])
    const options = ['A', 'B', 'C']
    const checkedHalf = checkedLsit.length > 0 && checkedLsit.length < 3
    const checkAll = checkedLsit.length === 3

    const onChangeCheckAll = (checked: boolean) => {
        if (checked) {
            setCheckedList(['A', 'B', 'C'])
        } else {
            setCheckedList([])
        }
    }

    return (
        <Fragment>
            <Checkbox checked={checkAll} checkedHalf={checkedHalf} onChange={onChangeCheckAll}>
                全选
            </Checkbox>
            <Group className={styles['checkbox-group']} checkedList={checkedLsit} onChange={setCheckedList} options={options} />
        </Fragment>
    )
}

export default Demo
