import React, { FC, useEffect, useRef, useState, isValidElement, cloneElement } from 'react'
import { getRootById, getDefaultRoot } from '../_utils'
import { stickyProps } from './types'
import './sticky.less'

const Sticky: FC<stickyProps> = (props) => {
    const { children, rootId, getRoot, offsetTop } = props
    const target = useRef<HTMLDivElement>(null)
    const targetOut = useRef<HTMLDivElement>(null)
    const [isFixed, setIsFixed] = useState(false)
    const [style, setStyle] = useState({})

    useEffect(() => {
        if (target.current !== null) {
            setStyle({
                height: target.current.offsetHeight,
                width: target.current.offsetWidth,
                display: target.current.style.display
            })
        }
    }, [])

    useEffect(() => {
        console.log('target', target.current)
        const root = getRoot ? getRoot() || getDefaultRoot() : getRootById(rootId)

        const options = {
            root,
            rootMargin: `${offsetTop}px 0px 0px 0px`,
            threshold: 1.0
        }

        const callback = (entries: any) => {
            entries.forEach((entry: any) => {
                console.log('entry', entry)
                if (entry.isIntersecting) {
                    setIsFixed(false)
                } else {
                    setIsFixed(true)
                }
            })
        }

        const observer = new IntersectionObserver(callback, options)

        if (targetOut.current !== null) {
            observer.observe(targetOut.current)
        }

        return () => {
            observer.disconnect()
        }
    }, [offsetTop, rootId, getRoot])

    const getChild = () => {
        if (children !== null) {
            const firstElement = Array.isArray(children) ? children[0] : children
            const element = isValidElement(firstElement) ? firstElement : <span>{firstElement}</span>
            const newPosition = isFixed ? 'fixed' : element.props?.style?.position
            const cloneE = cloneElement(element, { ref: target, style: { ...element.props.style, position: newPosition } })
            return cloneE
        }
        return null
    }

    return (
        <div className="uik-sticky" style={style} ref={targetOut}>
            {getChild()}
        </div>
    )
}

export default Sticky
