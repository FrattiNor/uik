import React, { FC, Fragment, useState, useRef } from 'react'
import classnames from 'classnames'
import Loading from '../loading'
import { useEffectAfterFirst } from '../_hooks'
import { buttonLoadingProps } from './types'
import './button-loading.less'

// 按钮loading
const ButtonLoading: FC<buttonLoadingProps> = (props) => {
    const { visible } = props
    const { LoadingIcon } = Loading
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
        <span className={classnames('uik-btn-loading-icon', animateClassname)}>
            <LoadingIcon />
        </span>
    ) : (
        <Fragment />
    )
}

export default ButtonLoading
