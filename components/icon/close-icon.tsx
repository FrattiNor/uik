import React, { FC } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { closeIconProps } from './types'
import './close-icon.less'

const CloseIcon: FC<closeIconProps> = (props) => {
    const { circle = false, danger = false, size = 'middle', className, visible = true, onClick, defaultIconProps = {}, wrapperClassName } = props

    const { name: defaultIconName, className: defaultIconClassName, size: defaultIconSize = 'middle', ...restDefaultIconProps } = defaultIconProps

    return (
        <span className={classnames('uik-close-icon-wrapper', wrapperClassName)}>
            {visible && (
                <Icon
                    defaultIcon
                    name={circle ? 'error' : 'close'}
                    className={classnames('uik-close-icon', [`${size}`], className, { danger })}
                    onClick={onClick}
                />
            )}
            {defaultIconName && !visible && (
                <Icon
                    defaultIcon
                    name={defaultIconName}
                    className={classnames('uik-close-default-icon', [`${defaultIconSize}`], defaultIconClassName)}
                    {...restDefaultIconProps}
                />
            )}
        </span>
    )
}

export default CloseIcon
