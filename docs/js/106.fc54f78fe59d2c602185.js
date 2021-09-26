(window.webpackJsonp=window.webpackJsonp||[]).push([[106],{405:function(n,e,t){"use strict";t.r(e),e.default="import React, { FC,  useState } from 'react'\nimport { Progress, Button } from 'uik'\nimport styles from './index.less'\n\nconst Demo: FC = () => {\n    const [percent, setPercent] = useState(50)\n\n    const add = () => {\n        setPercent(percent + 10 > 100 ? 100 : percent + 10)\n    }\n\n    const del = () => {\n        setPercent(percent - 10 < 0 ? 0 : percent - 10)\n    }\n\n    return (\n        <div className={styles['wrapper']}>\n            <Progress type=\"circle\" percent={percent} />\n            <div className={styles['btn-box']}>\n                <Button type=\"primary\" onClick={add}>add</Button>\n                <Button type=\"danger\" onClick={del}>del</Button>\n            </div>\n        </div>\n    )\n}\n\nexport default Demo\n"}}]);