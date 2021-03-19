import dayjs, { Dayjs } from 'dayjs'
import React, { FC, useEffect, useState } from 'react'
import { DatePicker, Icon } from 'uik'

const Test: FC = () => {
    return (
        <>
            <div style={{ margin: 24 }} onClick={() => console.log('C')}>
                <Icon defaultIcon name="error" />
            </div>
        </>
    )
}

export default Test
