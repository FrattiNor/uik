(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{391:function(n,t,o){"use strict";o.r(t),t.default="import React, { FC } from 'react'\nimport { Button, message } from 'uik'\nimport { messagePosition } from 'uik/message'\nimport styles from './index.less'\n\nconst Demo: FC = () => {\n    const openMessage = (position: messagePosition) => {\n        message.open(`这是一条message`, { position })\n    }\n\n    return (\n        <>\n            <div className={styles['wrapper']}>\n                <Button onClick={() => openMessage('topLeft')}>TL</Button>\n                <Button onClick={() => openMessage('topCenter')}>TC</Button>\n                <Button onClick={() => openMessage('topRight')}>TR</Button>\n            </div>\n            <div className={styles['wrapper']}>\n                <Button onClick={() => openMessage('bottomLeft')}>BL</Button>\n                <Button onClick={() => openMessage('bottomCenter')}>BC</Button>\n                <Button onClick={() => openMessage('bottomRight')}>BR</Button>\n            </div>\n        </>\n    )\n}\n\nexport default Demo\n"}}]);