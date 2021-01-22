/* eslint-disable no-unused-vars */
import { tooltipPosition } from './types'

type res = { top: number; left: number }
type current = HTMLElement | null
type fun = (position: tooltipPosition, target: current, tooltip: current) => res

const getTooltipPositionStyle: fun = (position, target, tooltip) => {
    let resStyle = { top: 0, left: 0 }

    if (tooltip !== null && target !== null) {
        const root = tooltip.offsetParent
        if (root !== null) {
            // 容器的视窗距离
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
                    resStyle = {
                        top: trueY - tooltipHeight,
                        left: trueX
                    }
                    break
                case 'topCenter':
                    resStyle = {
                        top: trueY - tooltipHeight,
                        left: trueX + targetWidth / 2 - tooltipWidth / 2
                    }
                    break
                case 'topRight':
                    resStyle = {
                        top: trueY - tooltipHeight,
                        left: trueX + targetWidth - tooltipWidth
                    }
                    break
                case 'bottomLeft':
                    resStyle = {
                        top: trueY + targetHeight,
                        left: trueX
                    }
                    break
                case 'bottomCenter':
                    resStyle = {
                        top: trueY + targetHeight,
                        left: trueX + targetWidth / 2 - tooltipWidth / 2
                    }
                    break
                case 'bottomRight':
                    resStyle = {
                        top: trueY + targetHeight,
                        left: trueX + targetWidth - tooltipWidth
                    }
                    break
                case 'leftTop':
                    resStyle = {
                        top: trueY,
                        left: trueX - tooltipWidth
                    }
                    break
                case 'leftCenter':
                    resStyle = {
                        top: trueY + targetHeight / 2 - tooltipHeight / 2,
                        left: trueX - tooltipWidth
                    }
                    break
                case 'leftBottom':
                    resStyle = {
                        top: trueY + targetHeight - tooltipHeight,
                        left: trueX - tooltipWidth
                    }
                    break
                case 'rightTop':
                    resStyle = {
                        top: trueY,
                        left: trueX + targetWidth
                    }
                    break
                case 'rightCenter':
                    resStyle = {
                        top: trueY + targetHeight / 2 - tooltipHeight / 2,
                        left: trueX + targetWidth
                    }
                    break
                case 'rightBottom':
                    resStyle = {
                        top: trueY + targetHeight - tooltipHeight,
                        left: trueX + targetWidth
                    }
                    break
                default:
                    resStyle = {
                        top: trueY - tooltipHeight,
                        left: trueX + targetWidth / 2 - tooltipWidth / 2
                    }
                    break
            }
        }
    }

    return resStyle
}

export { getTooltipPositionStyle }
