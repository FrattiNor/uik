(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{388:function(n,e,o){"use strict";o.r(e),e.default="import React, { FC } from 'react'\nimport { Button, message } from 'uik'\nimport styles from './index.less'\n\nconst Demo: FC = () => {\n    const openMessage = (type: 'success' | 'error' | 'warn' | 'info') => message.open(`这是一条 ${type} message`, { type })\n\n    return (\n        <div className={styles['wrapper']}>\n            <Button onClick={() => openMessage('success')}>success</Button>\n            <Button onClick={() => openMessage('error')}>error</Button>\n            <Button onClick={() => openMessage('warn')}>warn</Button>\n            <Button onClick={() => openMessage('info')}>info</Button>\n        </div>\n    )\n}\n\nexport default Demo\n"}}]);