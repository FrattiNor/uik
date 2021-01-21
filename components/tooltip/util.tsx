/* eslint-disable no-unused-vars */
import { CSSProperties } from 'react'
import { getRoot } from '../_utils'
import { tooltipPoint, tooltipPosition } from './types'

type point2 = { clientHeight: number; clientWidth: number }
type fun = (point: tooltipPoint, position: tooltipPosition, point2: point2, getRootContainer?: () => HTMLElement | null) => CSSProperties

const getTooltipPositionStyle: fun = (point, position, point2, getRootContainer) => {
    const root = getRoot(getRootContainer)

    const scrollTop = root.scrollTop || document.documentElement.scrollTop
    const scrollLeft = root.scrollLeft || document.documentElement.scrollTop

    const { x, y, width, height } = point
    const { clientHeight, clientWidth } = point2
    let resStyle = {}

    switch (position) {
        case 'topLeft':
            resStyle = {
                top: scrollTop + y - clientHeight,
                left: scrollLeft + x
            }
            break
        case 'topCenter':
            resStyle = {
                top: scrollTop + y - clientHeight,
                left: scrollLeft + x + width / 2 - clientWidth / 2
            }
            break
        case 'topRight':
            resStyle = {
                top: scrollTop + y - clientHeight,
                left: scrollLeft + x + width - clientWidth
            }
            break
        case 'bottomLeft':
            resStyle = {
                top: scrollTop + y + height,
                left: scrollLeft + x
            }
            break
        case 'bottomCenter':
            resStyle = {
                top: scrollTop + y + height,
                left: scrollLeft + x + width / 2 - clientWidth / 2
            }
            break
        case 'bottomRight':
            resStyle = {
                top: scrollTop + y + height,
                left: scrollLeft + x + width - clientWidth
            }
            break
        case 'leftTop':
            resStyle = {
                top: scrollTop + y,
                left: scrollLeft + x - clientWidth
            }
            break
        case 'leftCenter':
            resStyle = {
                top: scrollTop + y + height / 2 - clientHeight / 2,
                left: scrollLeft + x - clientWidth
            }
            break
        case 'leftBottom':
            resStyle = {
                top: scrollTop + y + height - clientHeight,
                left: scrollLeft + x - clientWidth
            }
            break
        case 'rightTop':
            resStyle = {
                top: scrollTop + y,
                left: scrollLeft + x + width
            }
            break
        case 'rightCenter':
            resStyle = {
                top: scrollTop + y + height / 2 - clientHeight / 2,
                left: scrollLeft + x + width
            }
            break
        case 'rightBottom':
            resStyle = {
                top: scrollTop + y + height - clientHeight,
                left: scrollLeft + x + width
            }
            break
        default:
            resStyle = {
                top: scrollTop + y - clientHeight,
                left: scrollLeft + x + width / 2 - clientWidth / 2
            }
            break
    }

    return resStyle
}

export { getTooltipPositionStyle }
