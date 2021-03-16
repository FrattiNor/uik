import React, { FC, Fragment, useState } from 'react'
import { Checkbox } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    const list = ['A', 'B', 'C']
    const [checkedAll, setCheckedAll] = useState(false)
    const [checkedHalf, setCheckedHalf] = useState(false)
    const [checkedList, setCheckList] = useState(['A'])

    const onCheckedChange = (checkedAll: boolean, checkedHalf: boolean) => {
        setCheckedAll(checkedAll)
        setCheckedHalf(checkedHalf)
    }

    const onChange = (checked: boolean) => {
        if (checked) {
            setCheckList(list)
        } else {
            setCheckList([])
        }
    }

    return (
        <Fragment>
            <Checkbox checked={checkedAll} checkedHalf={checkedHalf} onChange={onChange}>
                全选
            </Checkbox>
            <br />
            <Checkbox.Group className={styles['checkbox-group']} onCheckedChange={onCheckedChange} checkedList={checkedList} onChange={setCheckList}>
                {list.map((item) => (
                    <Checkbox key={item} value={item}>
                        {item}
                    </Checkbox>
                ))}
            </Checkbox.Group>
        </Fragment>
    )
}

export default Demo
