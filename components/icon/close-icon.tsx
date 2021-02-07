import React, { FC, useState, useRef, Fragment } from 'react'
import classnames from 'classnames'
import Icon from '../icon'
import { closeIconProps } from './types'
import { useEffectAfterFirst } from '../_hooks'
import './close-icon.less'

const CloseIcon: FC<closeIconProps> = (props) => {
    const { className, size = 'middle', circle = false, danger = false, visible = true, ...restProps } = props

    const [show, setShow] = useState(visible)
    const [animateClassname, setAnimateClassname] = useState(visible ? 'show' : 'hidden')
    const timeout = useRef<NodeJS.Timeout | null>(null)

    useEffectAfterFirst(() => {
        if (visible) {
            setShow(true)
            timeout.current = setTimeout(() => {
                setAnimateClassname('show')
            }, 50)
        } else {
            setAnimateClassname('hidden')
            timeout.current = setTimeout(() => {
                setShow(false)
                setAnimateClassname('')
            }, 350)
        }

        return () => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current)
            }
        }
    }, [visible])

    return show ? (
        <Icon
            defaultIcon
            name={circle ? 'error' : 'close'}
            className={classnames('uik-close-icon', className, size, animateClassname, { danger, show })}
            {...restProps}
        />
    ) : (
        <Fragment />
    )
}

export default CloseIcon
