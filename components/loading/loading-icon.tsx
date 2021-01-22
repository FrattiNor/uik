import React, { FC } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { loadingIconProps } from './types'
import './loading-icon.less'

const LoadingIcon: FC<loadingIconProps> = ({ className, ...rest }) => {
    return <Icon uik name="loading" className={classnames('uik-loading-icon', className)} {...rest} />
}

export default LoadingIcon