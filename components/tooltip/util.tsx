/* eslint-disable no-unused-vars */
import { tooltipPosition } from './types'
import { getRoot } from '../_utils/get-container'

type res = { top: number; left: number }
type current = HTMLElement | null
type errorType = 'top' | 'bottom' | 'left' | 'right'
type error = errorType[] | false
type getLeftTop = (position: tooltipPosition, target: HTMLElement, tooltip: HTMLElement, root: HTMLElement) => res
type getLeftTopError = (position: tooltipPosition, target: current, tooltip: current, rootId?: string) => res & { error: error }
type getPosition = (position: tooltipPosition, error: errorType[]) => tooltipPosition | false

// 根据 position 获取样式
const getLeftTopStyle: getLeftTop = (position, target, tooltip, root) => {
    let top = 0
    let left = 0

    // root的视窗距离
    const { x: rootX, y: rootY } = root.getBoundingClientRect()
    // 触发点的视窗距离
    const { x: targetX, y: targetY, width: targetWidth, height: targetHeight } = target.getBoundingClientRect()
    // tooltip本体的宽和高
    const tooltipHeight = tooltip.clientHeight
    const tooltipWidth = tooltip.clientWidth
    // tooltip实际的x，y距离
    const trueX = targetX - rootX
    const trueY = targetY - rootY

    switch (position) {
        case 'topLeft':
            top = trueY - tooltipHeight
            left = trueX
            break
        case 'topCenter':
            top = trueY - tooltipHeight
            left = trueX + targetWidth / 2 - tooltipWidth / 2

            break
        case 'topRight':
            top = trueY - tooltipHeight
            left = trueX + targetWidth - tooltipWidth
            break
        case 'bottomLeft':
            top = trueY + targetHeight
            left = trueX
            break
        case 'bottomCenter':
            top = trueY + targetHeight
            left = trueX + targetWidth / 2 - tooltipWidth / 2
            break
        case 'bottomRight':
            top = trueY + targetHeight
            left = trueX + targetWidth - tooltipWidth
            break
        case 'leftTop':
            top = trueY
            left = trueX - tooltipWidth
            break
        case 'leftCenter':
            top = trueY + targetHeight / 2 - tooltipHeight / 2
            left = trueX - tooltipWidth
            break
        case 'leftBottom':
            top = trueY + targetHeight - tooltipHeight
            left = trueX - tooltipWidth
            break
        case 'rightTop':
            top = trueY
            left = trueX + targetWidth
            break
        case 'rightCenter':
            top = trueY + targetHeight / 2 - tooltipHeight / 2
            left = trueX + targetWidth
            break
        case 'rightBottom':
            top = trueY + targetHeight - tooltipHeight
            left = trueX + targetWidth
            break
        default:
            top = trueY - tooltipHeight
            left = trueX + targetWidth / 2 - tooltipWidth / 2
            break
    }

    return { top, left }
}

// 根据 autoAdjust 调整样式
const getTooltipPositionStyle: getLeftTopError = (position, target, tooltip, rootId) => {
    let resStyle = { top: 0, left: 0 }
    const error: error = []
    const root = getRoot(rootId)

    if (tooltip !== null && target !== null) {
        // 容器的滚动高宽和本体高宽
        const rootScrollTop = root.scrollTop
        const rootScrollLeft = root.scrollLeft
        const { width: rootWidth, height: rootHeight } = root.getBoundingClientRect()
        // tooltip本体的宽和高
        const tooltipHeight = tooltip.clientHeight
        const tooltipWidth = tooltip.clientWidth

        // 获取 top left
        resStyle = getLeftTopStyle(position, target, tooltip, root)

        // 获取error
        if (resStyle.top < rootScrollTop) {
            // 上方不可见
            error.push('top')
        }
        if (rootScrollTop + rootHeight < resStyle.top + tooltipHeight) {
            // 下方不可见
            error.push('bottom')
        }
        if (resStyle.left < rootScrollLeft) {
            // 左侧不可见
            error.push('left')
        }
        if (rootScrollLeft + rootWidth < resStyle.left + tooltipWidth) {
            // 右侧不可见
            error.push('right')
        }
    }

    return { ...resStyle, error: error.length === 0 ? false : error }
}

// 获取自动定位
const autoAdjustPosition: getPosition = (position, error) => {
    if(['top','bottom'].every(item => error.includes(item as errorType))) {
        return false
    }
    if(['left','right'].every(item => error.includes(item as errorType))) {
        return false
    }

    let newPosition = position

    error.forEach((err) => {
        switch (err) {
            case 'top':
                {
                    newPosition = newPosition.replace('top', 'bottom') as tooltipPosition
                    newPosition = newPosition.replace('Center', 'Bottom') as tooltipPosition
                    newPosition = newPosition.replace('Top', 'Center') as tooltipPosition
                }
                break
            case 'bottom':
                {
                    newPosition = newPosition.replace('bottom', 'top') as tooltipPosition
                    newPosition = newPosition.replace('Center', 'Top') as tooltipPosition
                    newPosition = newPosition.replace('Bottom', 'Center') as tooltipPosition
                }
                break
            case 'left':
                {
                    newPosition = newPosition.replace('left', 'right') as tooltipPosition
                    newPosition = newPosition.replace('Center', 'Right') as tooltipPosition
                    newPosition = newPosition.replace('Left', 'Center') as tooltipPosition
                    
                }
                break
            case 'right':
                {
                    newPosition = newPosition.replace('right', 'left') as tooltipPosition
                    newPosition = newPosition.replace('Center', 'Left') as tooltipPosition
                    newPosition = newPosition.replace('Right', 'Center') as tooltipPosition
                }
                break
            default:
                break
        }
    })
    return 'bottomCenter'
}

export { getTooltipPositionStyle, autoAdjustPosition }
