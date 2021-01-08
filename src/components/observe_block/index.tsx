import React, { FC, useRef, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

type Props = {
    setHeight?: (height: number) => void
    setWidth?: (width: number) => void
}

const ObserveBlock: FC<Props> = ({ children, setHeight, setWidth }) => {
    const Ref: any = useRef(null)

    useEffect(() => {
        let ro: any
        if (Ref.current) {
            ro = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const { height, width } = entry.contentRect
                    if(typeof setHeight === 'function') {
                        setHeight(height)
                    }
                    if(typeof setWidth === 'function') {
                        setWidth(width)
                    }
                    
                }
            })

            ro.observe(Ref.current)
        }

        return () => {
            ro?.unobserve(Ref.current)
        }
    }, [])

    return <div ref={Ref}>{children}</div>
}

export default ObserveBlock
