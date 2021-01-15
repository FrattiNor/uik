import React, { FC } from 'react'
import classnames from 'classnames'
import LoadingIcon from './loading_icon'
import { loadingProps } from './types'
import './loading.less'

const Loading: FC<loadingProps> = (props) => {
    const { className = '', loading = false, inline = false, children } = props

    const style = { display: inline ? 'inline-block' : 'block' }

    const loadingState = (
        <div className={classnames('uik-loading', className)} style={style}>
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
