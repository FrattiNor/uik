(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{357:function(t,n,o){"use strict";o.r(n),n.default='import React, { FC } from \'react\'\nimport { Button, Confirm } from \'uik\'\nimport styles from \'./index.less\'\n\nconst Demo: FC = () => {\n    return (\n        <div className={styles[\'wrapper\']}>\n            <div className={styles[\'top\']}>\n                <Confirm content="topLeft" position="topLeft">\n                    <Button>TL</Button>\n                </Confirm>\n                <Confirm content="topCenter" position="topCenter">\n                    <Button>TC</Button>\n                </Confirm>\n                <Confirm content="topRight" position="topRight">\n                    <Button>TR</Button>\n                </Confirm>\n            </div>\n\n            <div className={styles[\'left-right\']}>\n                <div className={styles[\'left\']}>\n                    <Confirm content="leftTop" position="leftTop">\n                        <Button>LT</Button>\n                    </Confirm>\n                    <Confirm content="leftCenter" position="leftCenter">\n                        <Button>LC</Button>\n                    </Confirm>\n                    <Confirm content="leftBottom" position="leftBottom">\n                        <Button>LB</Button>\n                    </Confirm>\n                </div>\n\n                <div className={styles[\'right\']}>\n                    <Confirm content="rightTop" position="rightTop">\n                        <Button>RT</Button>\n                    </Confirm>\n                    <Confirm content="rightCenter" position="rightCenter">\n                        <Button>RC</Button>\n                    </Confirm>\n                    <Confirm content="rightBottom" position="rightBottom">\n                        <Button>RB</Button>\n                    </Confirm>\n                </div>\n            </div>\n\n            <div className={styles[\'bottom\']}>\n                <Confirm content="bottomLeft" position="bottomLeft">\n                    <Button>BT</Button>\n                </Confirm>\n                <Confirm content="bottomCenter" position="bottomCenter">\n                    <Button>BC</Button>\n                </Confirm>\n                <Confirm content="bottomRight" position="bottomRight">\n                    <Button>BR</Button>\n                </Confirm>\n            </div>\n        </div>\n    )\n}\n\nexport default Demo\n'}}]);