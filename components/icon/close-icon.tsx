import React, { FC, MouseEvent } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { closeIconProps } from './types'
import './close-icon.less'

const CloseIcon: FC<closeIconProps> = (props) => {
    const {
        circle = false,
        danger = false,
        size = 14,
        className = '',
        style = {},
        visible = true,
        onClick,
        defaultIconProps = {},
        wrapperClassName = '',
        wrapperStyle = {}
    } = props

    const {
        name: defaultIconName = '',
        className: defaultIconClassName = '',
        style: defaultIconStyle = {},
        size: defaultIconSize = 14
    } = defaultIconProps

    const onClear = (e: MouseEvent<HTMLElement>) => {
        if (onClick) onClick(e)
    }

    return (
        <span className={classnames('uik-close-icon-wrapper', wrapperClassName)} style={{ fontSize: size, ...wrapperStyle }}>
            {visible && (
                <span className={classnames('uik-close-icon-conetnt')}>
                    <Icon
                        defaultIcon
                        name={circle ? 'error' : 'close'}
                        className={classnames('uik-close-icon', className, { danger })}
                        onClick={onClear}
                        style={style}
                    />
                </span>
            )}
            {defaultIconName && !visible && (
                <span className={classnames('uik-close-icon-default')} style={{ fontSize: defaultIconSize }}>
                    <Icon
                        defaultIcon
                        name={defaultIconName}
                        className={classnames('uik-close-default-icon', defaultIconClassName)}
                        style={defaultIconStyle}
                    />
                </span>
            )}
        </span>
    )
}

export default CloseIcon
