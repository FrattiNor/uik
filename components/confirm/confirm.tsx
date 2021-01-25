import React, { FC, MouseEvent } from 'react'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeBackFC } from '../_hocs/notice/types'
import { confirmProps } from './types'
import Button from '../button'
import './confirm.less'

const Confirm: FC<confirmProps> = (props) => {
    const { content, okBtnProps = {}, cancelBtnProps = {}, okBtnText, cancelBtnText, onConfrim, onCancel } = props

    const trueCancel = (e: MouseEvent<HTMLElement>) => {
        if (onCancel) {
            onCancel(e)
        }
    }

    const trueConfrim = (e: MouseEvent<HTMLElement>) => {
        if (onConfrim) {
            onConfrim(e)
        }
    }

    return (
        <div className="uik-confirm">
            <div className="uik-confirm-content">{content}</div>
            <div className="uik-confirm-btn">
                <Button onClick={trueCancel} size="small" {...cancelBtnProps}>
                    {cancelBtnText || '取消'}
                </Button>
                <Button onClick={trueConfrim} size="small" type="primary" {...okBtnProps}>
                    {okBtnText || '确认'}
                </Button>
            </div>
        </div>
    )
}

const Component = noticeHoc({ backgroundColor: '#fff', emptyKey: 'content' })(Confirm)

export default noticeRenderHoc({ Component, name: 'confirm', defaultTrigger: 'click' }) as noticeBackFC<confirmProps>
