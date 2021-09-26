import React, { FC } from 'react'
import { Row, Col } from 'uik'
import styles from './index.less'

const Demo: FC = () => {
    return (
        <Row gutter={[24, 24]} align="top" justify="space-between">
            <Col span={8}>
                <div className={styles['col-inner']}>Col1</div>
            </Col>
            <Col span={8}>
                <div className={styles['col-inner']}>Col2</div>
            </Col>
            <Col span={8}>
                <div className={styles['col-inner']}>Col3</div>
            </Col>
            <Col span={8}>
                <div className={styles['col-inner']}>Col4</div>
            </Col>
            <Col span={8}>
                <div className={styles['col-inner']}>Col5</div>
            </Col>
            <Col span={8}>
                <div className={styles['col-inner']}>Col6</div>
            </Col>
            <Col span={8}>
                <div className={styles['col-inner']}>Col7</div>
            </Col>
            <Col span={8}>
                <div className={styles['col-inner']}>Col8</div>
            </Col>
            <Col span={8}>
                <div className={styles['col-inner']}>Col9</div>
            </Col>
        </Row>
    )
}

export default Demo
