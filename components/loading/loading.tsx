import React, { FC } from 'react'
import classnames from 'classnames'
import LoadingIcon from './loading_icon'
import { loadingProps } from './types'

import './loading.less'

console.log('Icon out')

const Loading: FC<loadingProps> = (props) => {

    console.log('Icon in')
    const { className = false, loading, children } = props

    const loadingState = (
        <div className={classnames('uik-loading', className)}>
            <div>
                <div className="uik-loading-mask">
                    <LoadingIcon />
                </div>
            </div>
            <div className="uik-loading-content">{children}</div>
        </div>
    )

    return loading ? loadingState : <>{children}</>
}

export default Loading
