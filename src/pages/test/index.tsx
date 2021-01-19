import React, { FC } from 'react'
import { Button, Tooltip } from 'uik'

const Test: FC = () => {
    return (
        <div style={{ margin: 15, height: 1000 }}>
            <Tooltip visible title="666">
                <Button type="primary">Loading</Button>
            </Tooltip>
        </div>
    )
}

export default Test
