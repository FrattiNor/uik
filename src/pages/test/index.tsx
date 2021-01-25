import React, { FC, useState } from 'react'
import { Button, Tooltip, Modal, message, Confirm, Icon } from 'uik'
const { config } = Icon
const { config: messconfig } = message

const Test: FC = () => {
    const [v, setV] = useState(false)

    const btn1 = () => {
        setV(!v)

        config({
            url: '//at.alicdn.com/t/font_2300539_ax28e8o4l8n.css',
            fontFamily: 'uik-iconfont',
            classPrefix: 'uik-icon-'
        })

        message.open('aaaa')
    }

    const btn2 = () => {
        messconfig({
            maxCount: 5,
            overAnimate: true,
            duration: 10,
            position: ['top', 'left']
        })
    }

    return (
        <>
            <Icon name="close" />
            <div style={{ margin: 150, height: 500, width: 500, background: 'rgba(0,0,0,0.3)', overflow: 'auto', position: 'relative' }} id="coc">
                <div style={{ margin: 50, height: 1000, width: 1000 }}>
                    <Confirm autoAdjust content="kalsjldkajslkfjlakjflshfklajskld">
                        <Button type="primary" onClick={btn1}>
                            Loading
                        </Button>
                    </Confirm>
                    <Button type="primary" onClick={btn2}>
                        btn2
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Test
