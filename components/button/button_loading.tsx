import React, { FC, Fragment, useState } from 'react'
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

    useEffectAfterFirst(() => {
        if (visible) {
            setShow(true)
            setTimeout(() => {
                setClassname('show')
            }, 50)
        } else {
            setClassname('hidden')
            setTimeout(() => {
                setShow(false)
            }, 3000000)
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
