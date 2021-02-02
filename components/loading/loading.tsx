import React, { FC } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { loadingProps } from './types'
import './loading.less'

const Loading: FC<loadingProps> = (props) => {
    const { LoadingIcon } = Icon
    const { className, loading = false, inline = false, children, ...restProps } = props

    const style = { display: inline ? 'inline-block' : 'block' }

    const loadingState = (
        <div className={classnames('uik-loading', className)} style={style} {...restProps}>
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
