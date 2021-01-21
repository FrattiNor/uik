import React, { FC, Fragment } from 'react'
import { Button, Tooltip } from 'uik'

const Demo: FC = () => {
    return (
        <Fragment>
            <Tooltip title="prompt text">
                <Button>Tooltip will show on mouse enter.</Button>
            </Tooltip>
        </Fragment>
    )
}

export default Demo
