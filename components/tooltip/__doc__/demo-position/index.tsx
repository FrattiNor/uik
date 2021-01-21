import React, { FC } from 'react'
import { Button, Tooltip } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['top']}>
                <Tooltip title="topLeft" position="topLeft">
                    <Button>TL</Button>
                </Tooltip>
                <Tooltip title="topCenter" position="topCenter">
                    <Button>TC</Button>
                </Tooltip>
                <Tooltip title="topRight" position="topRight">
                    <Button>TR</Button>
                </Tooltip>
            </div>

            <div className={styles['left-right']}>
                <div className={styles['left']}>
                    <Tooltip title="leftTop" position="leftTop">
                        <Button>LT</Button>
                    </Tooltip>
                    <Tooltip title="leftCenter" position="leftCenter">
                        <Button>LC</Button>
                    </Tooltip>
                    <Tooltip title="leftBottom" position="leftBottom">
                        <Button>LB</Button>
                    </Tooltip>
                </div>

                <div className={styles['right']}>
                    <Tooltip title="rightTop" position="rightTop">
                        <Button>RT</Button>
                    </Tooltip>
                    <Tooltip title="rightCenter" position="rightCenter">
                        <Button>RC</Button>
                    </Tooltip>
                    <Tooltip title="rightBottom" position="rightBottom">
                        <Button>RB</Button>
                    </Tooltip>
                </div>
            </div>

            <div className={styles['bottom']}>
                <Tooltip title="bottomLeft" position="bottomLeft">
                    <Button>BT</Button>
                </Tooltip>
                <Tooltip title="bottomCenter" position="bottomCenter">
                    <Button>BC</Button>
                </Tooltip>
                <Tooltip title="bottomRight" position="bottomRight">
                    <Button>BR</Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default Demo
