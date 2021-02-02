import React, { FC } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { closeIconProps } from './types'
import './close-icon.less'

const CloseIcon: FC<closeIconProps> = (props) => {
    const { className, size = 'middle', circle = false, danger = false, ...restProps } = props

    return <Icon defaultIcon name={circle ? 'error' : 'close'} className={classnames('uik-close-icon', className, size, { danger })} {...restProps} />
}

export default CloseIcon
