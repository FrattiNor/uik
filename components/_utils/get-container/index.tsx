import { getRoot } from '../index'
import './index.less'

type containerProps = {
    id?: string
    classname?: string
    containerType?: 'fixed' | 'absolute'
    zIndex?: number
    getRootContainer?: () => HTMLElement | null
}

const getContainer = ({ id, classname, containerType, zIndex, getRootContainer }: containerProps): HTMLElement => {
    const root = getRoot(getRootContainer)
    const container = id && document.getElementById(id)

    if (!container) {
        const container = document.createElement('div')

        if (id) {
            container.setAttribute('id', id)
        }
        if (classname) {
            container.setAttribute('class', classname)
        }
        if (containerType) {
            const containerOut = document.createElement('div')
            containerOut.setAttribute('class', `uik-${containerType}-container`)
            if (zIndex) {
                containerOut.setAttribute('style', `z-index:${zIndex}`)
            }
            containerOut.append(container)
            root.append(containerOut)
        } else {
            root.append(container)
        }

        return container
    }

    return container
}

export default getContainer
