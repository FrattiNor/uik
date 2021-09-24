import React, { FC } from 'react'
import { Col, Row } from 'uik'

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }}>
                <Row gutter={[24, 24]} align="top" justify="space-between" rowGap={false}>
                    <Col span={4} leftSpan={4}>Col1</Col>
                    <Col span={8}>Col2</Col>
                    <Col span={8}>Col3</Col>
                    <Col span={8}>Col4</Col>
                    <Col span={8}>Col5</Col>
                    <Col span={8}>Col6</Col>
                    <Col span={8}>Col7</Col>
                    <Col span={8}>Col8</Col>
                    <Col span={8}>Col9</Col>
                </Row>
            </div>
        </>
    )
}

export default Test
