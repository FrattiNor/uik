(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{351:function(e,n,c){"use strict";c.r(n),n.default="import React, { FC, Fragment, useState } from 'react'\nimport { Checkbox } from 'uik'\nimport styles from './index.less'\n\nconst Demo: FC = () => {\n    const list = ['A', 'B', 'C']\n    const [checkedAll, setCheckedAll] = useState(false)\n    const [checkedHalf, setCheckedHalf] = useState(false)\n    const [checkedList, setCheckList] = useState(['A'])\n\n    const onCheckedChange = (checkedAll: boolean, checkedHalf: boolean) => {\n        setCheckedAll(checkedAll)\n        setCheckedHalf(checkedHalf)\n    }\n\n    const onChange = (checked: boolean) => {\n        if (checked) {\n            setCheckList(list)\n        } else {\n            setCheckList([])\n        }\n    }\n\n    return (\n        <Fragment>\n            <Checkbox checked={checkedAll} checkedHalf={checkedHalf} onChange={onChange}>\n                全选\n            </Checkbox>\n            <br />\n            <Checkbox.Group className={styles['checkbox-group']} onCheckedChange={onCheckedChange} checkedList={checkedList} onChange={setCheckList}>\n                {list.map((item) => (\n                    <Checkbox key={item} value={item}>\n                        {item}\n                    </Checkbox>\n                ))}\n            </Checkbox.Group>\n        </Fragment>\n    )\n}\n\nexport default Demo\n"}}]);