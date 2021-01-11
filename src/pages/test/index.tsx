import React, { FC } from 'react'
import { Button, Loading } from 'uik'

const { LoadingIcon } = Loading
console.log('LoadingIcon', LoadingIcon)

const Test: FC = () => {
    return (
        <>
            <Button type="primary">Button</Button>
            <Loading loading>
                <div>1111</div>
            </Loading>
        </>
    )
}

export default Test
