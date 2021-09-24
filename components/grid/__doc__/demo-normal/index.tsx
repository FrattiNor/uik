import React, { FC } from 'react'
import { Row, Col } from 'uik'

const Demo: FC = () => {
    return (
        <Row gutter={[24, 24]} align="top" justify="space-between">
            <Col span={8}>Col1</Col>
            <Col span={8}>Col2</Col>
            <Col span={8}>Col3</Col>
            <Col span={8}>Col4</Col>
            <Col span={8}>Col5</Col>
            <Col span={8}>Col6</Col>
            <Col span={8}>Col7</Col>
            <Col span={8}>Col8</Col>
            <Col span={8}>Col9</Col>
        </Row>
    )
}

export default Demo
