import React, { FC } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { loadingIconProps } from './types'
import './loading_icon.less'

const LoadingIcon: FC<loadingIconProps> = ({ className }) => {
    return <Icon name="loading" className={classnames('uik-loading-icon', className)} />
}

export default LoadingIcon
