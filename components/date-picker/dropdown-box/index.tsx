import React, { FC, useEffect, useRef } from 'react'
import noticeHoc from '../../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../../_hocs/notice/notice-render-hoc'
import { pickerDropdownProps } from './types'
import './index.less'

const PickerDropdown: FC<pickerDropdownProps> = (props) => {
    const pickRef = useRef<HTMLDivElement>(null)
    const timeout = useRef<number | null>(null)
    // 使用 setVirtualVisible 关闭， 外部使用 onVisibleChange 监听
    const { onEmptyClick, target, topDom, bottomDom, leftDom, rightDom, centerDom } = props

    useEffect(() => {
        //  手动添加点击空白事件
        const clickClose = (event: globalThis.MouseEvent) => {
            const notice = pickRef.current
            const clickNode = event.target as HTMLElement
            // 点击其他区域时, 隐藏指定区域
            // 点击区域不为children，点击区域不为弹出部分，点击区域不为弹出部分的子元素
            if (notice !== null && clickNode !== null && target !== null) {
                if (!(notice === clickNode || notice.contains(clickNode) || target === clickNode || target.contains(clickNode))) {
                    if (onEmptyClick) timeout.current = setTimeout(onEmptyClick)
                }
            }
        }
        document.addEventListener('click', clickClose)

        return () => {
            // 点击外部可能会销毁组件，直接取消事件就行了
            if (timeout.current) clearTimeout(timeout.current)
            document.removeEventListener('click', clickClose)
        }
    }, [onEmptyClick])

    return (
        <div className="uik-picker-wrapper" ref={pickRef} onMouseDown={(e) => e.preventDefault()}>
            {leftDom && <div className="uik-picker-left">{leftDom}</div>}
            <div className="uik-picker">
                {topDom && <div className="uik-picker-top">{topDom}</div>}
                {centerDom}
                {bottomDom && <div className="uik-picker-bottom">{bottomDom}</div>}
            </div>
            {rightDom && <div className="uik-picker-right">{rightDom}</div>}
        </div>
    )
}

const DropdownComponent = noticeHoc<pickerDropdownProps>({
    backgroundColor: '#fff',
    needArrow: false,
    defaultPosition: 'bottomLeft',
    isDropdown: true
})(PickerDropdown)

export default noticeRenderHoc<pickerDropdownProps>({ name: 'uik-date-picker', defaultZIndex: 1002 })(DropdownComponent)
