import React, { FC, useState, isValidElement, cloneElement, ReactElement, useEffect } from 'react'
import classnames from 'classnames'
import SelectDropdown from './select-dropdown'
import { selectProps, optionProps } from './types'
import Icon from '../icon'
import SelectOption from './option'
import { useVisible } from '../_hooks'
import './select.less'

const Select: FC<selectProps> = (props) => {
    const { CloseIcon } = Icon
    const {
        value: outValue,
        defaultValue = [],
        children,
        virtualList = 50,
        showCount,
        itemHeight,
        multiple = false,
        allowClear = false,
        disabled = false,
        error = false,
        size = 'middle',
        width,
        overlayHeight,
        onChange: outOnChange,
        visible: outVisible,
        onVisibleChange
    } = props

    const [hover, setHover] = useState(false)
    const getListOne = (v: string[]) => (multiple ? v : v.length > 0 ? [v[0]] : [])
    const getValue = (v: undefined | string | string[]) => (v ? (Array.isArray(v) ? getListOne(v) : [v]) : [])
    const [visible, setVisible] = useVisible(outVisible, onVisibleChange, false)
    const [virtualValue, setVirtualValue] = useState(getValue(defaultValue))
    const value = outValue !== undefined ? getValue(outValue) : virtualValue
    const focus = visible

    const onChange = (newValue: string[]) => {
        const handleNewValue = () => (multiple ? newValue : newValue[0])
        if (outOnChange) outOnChange(handleNewValue())
        setVirtualValue(newValue)
    }

    const itemClick = (v: string, selected: boolean) => {
        if (!disabled) {
            let newValue = value
            if (multiple) {
                if (selected) {
                    newValue = newValue.filter((item) => item !== v)
                } else {
                    newValue = [...value, v]
                }
            } else {
                newValue = [v]
            }
            onChange(newValue)
            if (!multiple) {
                setVisible(false)
            }
        }
    }

    const getOptions = () => {
        const childs = Array.isArray(children) ? children : [children]
        return childs
            .map((child, index) => {
                if (isValidElement(child) && child.type === SelectOption) {
                    const childProps = child.props as optionProps
                    const selected = value.includes(childProps.value)
                    return cloneElement(child as ReactElement<optionProps>, {
                        key: child.key || index,
                        selected,
                        itemClick
                    })
                } else {
                    return null
                }
            })
            .filter((item) => item)
    }

    const options = getOptions()
    const optionsLen = options.length

    const onClick = () => {
        if (!disabled) {
            setVisible(true)
        }
    }

    const onClear = () => {
        if (!disabled) {
            setVirtualValue([])
        }
    }

    const deleteItem = (v: string) => {
        if (!disabled) {
            const newValue = value.filter((item) => item !== v)
            onChange(newValue)
        }
    }

    const getValueDom = () => {
        const getItem = (v: string) => {
            const item = options.find((item) => item?.props.value === v)
            const label = item ? item.props.label : null
            const children = item ? (item.props as any).children : null
            return label || children
        }

        if (multiple) {
            const items = value.map((v) => {
                return (
                    <div key={v} className={classnames('uik-select-multiple-item', [`${size}`], { disabled })}>
                        <span>{getItem(v)}</span>
                        <CloseIcon
                            size="small"
                            className="uik-select-multiple-item-close"
                            onClick={(e) => {
                                e.stopPropagation()
                                deleteItem(v)
                            }}
                        />
                    </div>
                )
            })
            return items
        } else {
            return getItem(value[0])
        }
    }

    const onMouseEnter = () => {
        setHover(true)
    }

    const onMouseLeave = () => {
        setHover(false)
    }

    useEffect(() => {
        if (disabled) {
            setVisible(false)
        }
    }, [disabled])

    const allowClearShow = value.length > 0 && allowClear && !disabled && hover

    return (
        <SelectDropdown
            options={options}
            virtualList={virtualList}
            showCount={showCount || optionsLen > 10 ? 10 : optionsLen}
            itemHeight={itemHeight}
            visible={visible}
            overlayHeight={overlayHeight}
            onVisibleChange={setVisible}
            popSameWidth
        >
            <label
                className={classnames('uik-select', { focus, error, disabled })}
                onClick={onClick}
                style={{ width }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className="uik-select-content">
                    <div className={classnames('uik-select-content-value', [`${size}`], { multiple })}>{getValueDom()}</div>
                    <Icon defaultIcon name="arrow-down" className={classnames('uik-select-content-arrow', { visible, hidden: allowClearShow })} />
                    <CloseIcon visible={allowClearShow} circle size="small" className="uik-select-content-close" onClick={onClear} />
                </div>
            </label>
        </SelectDropdown>
    )
}

export default Select
