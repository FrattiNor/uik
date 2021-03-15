import React, { FC } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { closeIconProps } from './types'
import './close-icon.less'

const CloseIcon: FC<closeIconProps> = (props) => {
    const {
        className,
        defaultIcon,
        defaultIconProps = {},
        closeIconProps = {},
        circle = false,
        danger = false,
        visible = true,
        size = 'middle',
        defaultIconSize = 'middle',
        ...restProps
    } = props

    const { className: defaultIconClassName, ...restDefaultIconProps } = defaultIconProps
    const { className: closeIconClassName, ...restCloseIconProps } = closeIconProps

    return (
        <span className={classnames(className, 'uik-close-icon-wrapper')} {...restProps}>
            {visible && (
                <Icon
                    defaultIcon
                    name={circle ? 'error' : 'close'}
                    className={classnames('uik-close-icon', [`${size}`], closeIconClassName, { danger })}
                    {...restCloseIconProps}
                />
            )}
            {defaultIcon && !visible && (
                <Icon
                    defaultIcon
                    name={defaultIcon}
                    className={classnames('uik-close-default-icon', [`${defaultIconSize}`], defaultIconClassName)}
                    {...restDefaultIconProps}
                />
            )}
        </span>
    )
}

export default CloseIcon
