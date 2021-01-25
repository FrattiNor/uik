import React, { FC, Fragment } from 'react'
import { Button, Tooltip } from 'uik'

const Demo: FC = () => {
    return (
        <Fragment>
            <Tooltip title="tooltip文本">
                <Button>鼠标移入触发tooltip</Button>
            </Tooltip>
        </Fragment>
    )
}

export default Demo
