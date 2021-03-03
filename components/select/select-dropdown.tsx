import React, { cloneElement, FC } from 'react'
import ReactTinyVirtualList from 'react-tiny-virtual-list'
import noticeHoc from '../_hocs/notice/notice-hoc'
import noticeRenderHoc from '../_hocs/notice/notice-render-hoc'
import { noticeProps } from '../_hocs/notice/types'
import { selectDropdownProps } from './types'

const SelectDropdown: FC<selectDropdownProps & noticeProps> = (props) => {
    const { options, virtualList, showCount, itemHeight, overlayHeight } = props

    const defaultItemHeight = 30

    const len = options.length

    const virtual = typeof virtualList === 'number' ? len >= virtualList : !!virtualList

    const getItemHeight = (index: number) => (itemHeight ? (typeof itemHeight === 'number' ? itemHeight : itemHeight(index)) : 'auto')

    const height = overlayHeight || showCount * ((itemHeight ? getItemHeight(0) : defaultItemHeight) as number)

    return virtual ? (
        <ReactTinyVirtualList
            itemCount={options.length}
            itemSize={itemHeight || defaultItemHeight}
            height={height}
            renderItem={({ index, style }) => (
                <div key={index} style={style}>
                    {options[index]}
                </div>
            )}
        />
    ) : (
        <div style={{ height, overflowY: 'auto' }}>
            {options.map((item, index) => cloneElement(item, { style: { ...(item.props.style || {}), height: getItemHeight(index) } }))}
        </div>
    )
}

const Component = noticeHoc<selectDropdownProps>({
    backgroundColor: '#fff',
    emptyKey: 'options',
    defaultPosition: 'bottomLeft',
    updatePositionProps: ['options'],
    needArrow: false,
    isDropdown: true,
    emptyClickClose: true
})(SelectDropdown)

export default noticeRenderHoc<selectDropdownProps>({ name: 'dropdown', defaultZIndex: 1001 })(Component)
