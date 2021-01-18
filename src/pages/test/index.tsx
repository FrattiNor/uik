import React, { FC, useEffect, useState } from 'react'
import { Button, message, Modal } from 'uik'

const ModalInner: FC = () => {
    const [num, setNum] = useState(1)

    useEffect(() => {
        console.log(num)
        const a = setTimeout(() => {
            setNum(num + 1)
        }, 1000)

        return () => {
            clearTimeout(a)
        }
    }, [num])

    return <div style={{height: 10000}}>{num}</div>
}

const Test: FC = () => {
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState('primary')
    const [width, setWidth] = useState(500)
    const [visible, setVisible] = useState(false)

    const [visible2, setVisible2] = useState(false)

    const onClick = () => {
        // message.open('okkk', { type: 'success' })
        setLoading(!loading)
        setVisible(true)
    }

    const onClick2 = () => {
        // message.open('okkk', { type: 'success' })
        setLoading(!loading)
        setVisible2(true)
    }

    return (
        <div style={{ margin: 15 }}>
            <Button loading={loading}>Loading</Button>
            <Button type={type} onClick={onClick}>
                ADD1
            </Button>
            <Button type={type} onClick={onClick2}>
                ADD2
            </Button>

            <Modal zIndex={1} style={{zIndex: 1}} title="okk1" destroyOnClose width={width} visible={visible} onCancel={() => setVisible(false)} onOk={() => setWidth(width + 100)}>
                <ModalInner />
            </Modal>
            <Modal zIndex={2} style={{zIndex: 2}} title="okk2" visible={visible2} onCancel={() => setVisible2(false)} onOk={() => setWidth(width + 100)}>
                <ModalInner />
            </Modal>
        </div>
    )
}

export default Test
