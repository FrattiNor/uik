(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{355:function(n,e,s){"use strict";s.r(e),e.default="import React, { FC, useState } from 'react'\nimport { Button, Confirm, message } from 'uik'\n\nconst Demo: FC = () => {\n    const [visible, setVisible] = useState(false)\n\n    // console.log('v', visible)\n\n    const confirm = () => {\n        message.open('你点击了确认', { type: 'success' })\n        setVisible(false)\n    }\n\n    const cancel = () => {\n        message.open('你点击了取消', { type: 'error' })\n        setVisible(false)\n    }\n\n    return (\n        <Confirm content=\"确认弹窗，你确认要关闭吗？\" visible={visible} onConfrim={confirm} onCancel={cancel} onVisibleChange={(v) => setVisible(v)}>\n            <Button type=\"primary\">点击触发弹窗</Button>\n        </Confirm>\n    )\n}\n\nexport default Demo\n"}}]);