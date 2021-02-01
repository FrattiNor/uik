import React, { FC } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { closeIconProps } from './types'
import './close-icon.less'

const CloseIcon: FC<closeIconProps> = (props) => {
    const { className, ...rest } = props

    return <Icon uik name="close" className={classnames('uik-close-icon', className)} {...rest} />
}

export default CloseIcon
