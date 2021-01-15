import React, { FC } from 'react'
import { Loading } from 'uik'
import './index.less'

const Demo: FC = () => {
    return (
        <Loading loading>
            <div className="card">加载中</div>
        </Loading>
    )
}

export default Demo
