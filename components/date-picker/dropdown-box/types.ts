/* eslint-disable no-unused-vars */
import { ReactElement } from 'react'
import { noticeRenderProps } from '../../_hocs/notice/types'

export type wrapperProps = {
    topDom?: ReactElement
    bottomDom?: ReactElement
    leftDom?: ReactElement
    rightDom?: ReactElement
}

export type pickerDropdownPropsToOut = {
    onEmptyClick?: () => void
    target: HTMLElement | null
} & wrapperProps &
    noticeRenderProps

export type pickerDropdownProps = {
    centerDom: ReactElement
    onEmptyClick?: () => void
    target: HTMLElement | null
} & wrapperProps
