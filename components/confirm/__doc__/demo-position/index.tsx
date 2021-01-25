import React, { FC } from 'react'
import { Button, Confirm } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['top']}>
                <Confirm content="topLeft" position="topLeft">
                    <Button>TL</Button>
                </Confirm>
                <Confirm content="topCenter" position="topCenter">
                    <Button>TC</Button>
                </Confirm>
                <Confirm content="topRight" position="topRight">
                    <Button>TR</Button>
                </Confirm>
            </div>

            <div className={styles['left-right']}>
                <div className={styles['left']}>
                    <Confirm content="leftTop" position="leftTop">
                        <Button>LT</Button>
                    </Confirm>
                    <Confirm content="leftCenter" position="leftCenter">
                        <Button>LC</Button>
                    </Confirm>
                    <Confirm content="leftBottom" position="leftBottom">
                        <Button>LB</Button>
                    </Confirm>
                </div>

                <div className={styles['right']}>
                    <Confirm content="rightTop" position="rightTop">
                        <Button>RT</Button>
                    </Confirm>
                    <Confirm content="rightCenter" position="rightCenter">
                        <Button>RC</Button>
                    </Confirm>
                    <Confirm content="rightBottom" position="rightBottom">
                        <Button>RB</Button>
                    </Confirm>
                </div>
            </div>

            <div className={styles['bottom']}>
                <Confirm content="bottomLeft" position="bottomLeft">
                    <Button>BT</Button>
                </Confirm>
                <Confirm content="bottomCenter" position="bottomCenter">
                    <Button>BC</Button>
                </Confirm>
                <Confirm content="bottomRight" position="bottomRight">
                    <Button>BR</Button>
                </Confirm>
            </div>
        </div>
    )
}

export default Demo
