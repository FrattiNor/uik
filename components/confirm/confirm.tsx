import React, { FC, MouseEvent } from 'react'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeProps } from '../_hocs/notice/types'
import { confirmProps } from './types'
import Button from '../button'
import './confirm.less'

const Confirm: FC<confirmProps & noticeProps> = (props) => {
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

const Component = noticeHoc<confirmProps>({ backgroundColor: '#fff', emptyKey: 'content', updatePositionProps: ['content'] })(Confirm)

export default noticeRenderHoc<confirmProps>({ name: 'confirm', defaultTrigger: 'click', defaultZIndex: 1003 })(Component)
