/* eslint-disable no-unused-vars */
import { noticePosition } from './types'

type res = { top: number; left: number }
type elementOrNull = HTMLElement | null
type errorType = 'top' | 'bottom' | 'left' | 'right'
type error = errorType[] | false
type getLeftTop = (position: noticePosition, target: HTMLElement, notice: HTMLElement, root: HTMLElement) => res
type getLeftTopError = (position: noticePosition, target: elementOrNull, notice: elementOrNull, root: elementOrNull, container: elementOrNull) => res & { error: error }
type getPosition = (position: noticePosition, error: errorType[]) => noticePosition | false

// 根据 position 目标元素，notice本身，容器本身 获取 top left
const getLeftTopStyle: getLeftTop = (position, target, notice, container) => {
    let top = 0
    let left = 0

    // 容器的视窗距离
    const { x: containerX, y: containerY } = container.getBoundingClientRect()

    // 触发点的视窗距离
    const { x: targetX, y: targetY, width: targetWidth, height: targetHeight } = target.getBoundingClientRect()
    // notice本体的宽和高
    const noticeHeight = notice.clientHeight
    const noticeWidth = notice.clientWidth

    // notice实际的x，y距离
    const trueX = targetX - containerX
    const trueY = targetY - containerY

    switch (position) {
        case 'topLeft':
            top = trueY - noticeHeight
            left = trueX
            break
        case 'topCenter':
            top = trueY - noticeHeight
            left = trueX + targetWidth / 2 - noticeWidth / 2
            break
        case 'topRight':
            top = trueY - noticeHeight
            left = trueX + targetWidth - noticeWidth
            break
        case 'bottomLeft':
            top = trueY + targetHeight
            left = trueX
            break
        case 'bottomCenter':
            top = trueY + targetHeight
            left = trueX + targetWidth / 2 - noticeWidth / 2
            break
        case 'bottomRight':
            top = trueY + targetHeight
            left = trueX + targetWidth - noticeWidth
            break
        case 'leftTop':
            top = trueY
            left = trueX - noticeWidth
            break
        case 'leftCenter':
            top = trueY + targetHeight / 2 - noticeHeight / 2
            left = trueX - noticeWidth
            break
        case 'leftBottom':
            top = trueY + targetHeight - noticeHeight
            left = trueX - noticeWidth
            break
        case 'rightTop':
            top = trueY
            left = trueX + targetWidth
            break
        case 'rightCenter':
            top = trueY + targetHeight / 2 - noticeHeight / 2
            left = trueX + targetWidth
            break
        case 'rightBottom':
            top = trueY + targetHeight - noticeHeight
            left = trueX + targetWidth
            break
        default:
            top = trueY - noticeHeight
            left = trueX + targetWidth / 2 - noticeWidth / 2
            break
    }

    return { top, left }
}

// 根据 autoAdjust 调整样式
const getPositionStyle: getLeftTopError = (position, target, notice, root, container) => {
    let resStyle = { top: 0, left: 0 }
    const error: error = []

    if (root !== null && notice !== null && target !== null && container !== null) {
        // 容器的滚动高宽和本体高宽
        const rootScrollTop = root.scrollTop
        const rootScrollLeft = root.scrollLeft
        const { width: rootWidth, height: rootHeight } = root.getBoundingClientRect()
        // notice本体的宽和高
        const noticeHeight = notice.clientHeight
        const noticeWidth = notice.clientWidth

        // 获取 top left
        resStyle = getLeftTopStyle(position, target, notice, container)

        // 获取error
        if (resStyle.top < rootScrollTop) {
            // 上方不可见
            error.push('top')
        }
        if (rootScrollTop + rootHeight < resStyle.top + noticeHeight) {
            // 下方不可见
            error.push('bottom')
        }
        if (resStyle.left < rootScrollLeft) {
            // 左侧不可见
            error.push('left')
        }
        if (rootScrollLeft + rootWidth < resStyle.left + noticeWidth) {
            // 右侧不可见
            error.push('right')
        }
    }

    return { ...resStyle, error: error.length === 0 ? false : error }
}

// 获取自动定位
const autoAdjustPosition: getPosition = (position, error) => {
    if (['top', 'bottom'].every((item) => error.includes(item as errorType))) {
        return false
    }
    if (['left', 'right'].every((item) => error.includes(item as errorType))) {
        return false
    }

    let newPosition = position
    error.forEach((err) => {
        switch (err) {
            case 'top':
                {
                    newPosition = newPosition.replace('top', 'bottom') as noticePosition
                    if (!newPosition.includes('bottom')) {
                        newPosition = newPosition.replace('Center', 'Top') as noticePosition
                    }
                    newPosition = newPosition.replace('Bottom', 'Center') as noticePosition
                }
                break
            case 'bottom':
                {
                    newPosition = newPosition.replace('bottom', 'top') as noticePosition
                    if (!newPosition.includes('top')) {
                        newPosition = newPosition.replace('Center', 'Bottom') as noticePosition
                    }
                    newPosition = newPosition.replace('Top', 'Center') as noticePosition
                }
                break
            case 'left':
                {
                    newPosition = newPosition.replace('left', 'right') as noticePosition
                    if (!newPosition.includes('right')) {
                        newPosition = newPosition.replace('Center', 'Left') as noticePosition
                    }
                    newPosition = newPosition.replace('Right', 'Center') as noticePosition
                }
                break
            case 'right':
                {
                    newPosition = newPosition.replace('right', 'left') as noticePosition
                    if (!newPosition.includes('left')) {
                        newPosition = newPosition.replace('Center', 'Right') as noticePosition
                    }
                    newPosition = newPosition.replace('Left', 'Center') as noticePosition
                }
                break
            default:
                break
        }
    })
    return newPosition
}

export { getPositionStyle, autoAdjustPosition }
