(window.webpackJsonp=window.webpackJsonp||[]).push([[118],{426:function(e,n,t){"use strict";t.r(n),n.default="import React, { FC, useRef } from 'react'\nimport { Button, Sticky } from 'uik'\nimport styles from './index.less'\n\nconst Demo: FC = () => {\n    const wrapperRef = useRef<HTMLDivElement>(null)\n\n    return (\n        <div className={styles['wrapper']} ref={wrapperRef}>\n            <div className={styles['wrapper-inner']}>\n                <Sticky offsetBottom={10} getRoot={() => wrapperRef.current} getRootParent={() => document}>\n                    <Button type=\"primary\">Sticky</Button>\n                </Sticky>\n            </div>\n        </div>\n    )\n}\n\nexport default Demo\n"}}]);