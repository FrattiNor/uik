import React, { FC, Fragment, useState, useRef, MutableRefObject } from 'react'
import classnames from 'classnames'
import Loading from '../loading'
import { useEffectAfterFirst } from '../_hooks'
import { buttonLoadingProps } from './types'
import './button_loading.less'

// 按钮loading
const ButtonLoading: FC<buttonLoadingProps> = ({ visible }) => {
    const { LoadingIcon } = Loading
    const [show, setShow] = useState(visible)
    const [classname, setClassname] = useState(visible ? 'show' : 'hidden')
    const timeout: MutableRefObject<NodeJS.Timeout | null> = useRef(null)

    useEffectAfterFirst(() => {
        if (visible) {
            setShow(true)
            timeout.current = setTimeout(() => {
                setClassname('show')
            }, 50)
        } else {
            setClassname('hidden')
            timeout.current = setTimeout(() => {
                setShow(false)
            }, 350)
        }

        return () => {
            if (timeout.current !== null) {
                clearTimeout(timeout.current)
            }
        }
    }, [visible])

    return show ? (
        <span className={classnames('uik-btn-loading-icon', classname)}>
            <LoadingIcon />
        </span>
    ) : (
        <Fragment />
    )
}

export default ButtonLoading
