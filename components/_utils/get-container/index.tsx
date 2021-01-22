import './index.less'

type containerProps = {
    id?: string
    classname?: string
    containerType?: 'fixed' | 'absolute'
    zIndex?: number
    rootId?: string
}

const getRoot = (rootId?: string): HTMLElement => {
    return rootId ? document.getElementById(rootId) || document.body : document.body
}

const getContainer = ({ id, classname, containerType, zIndex, rootId }: containerProps): HTMLElement => {
    const root = getRoot(rootId)
    const newId = id ? (rootId ? `${id}-${rootId}` : id) : false

    const container = newId && document.getElementById(newId)

    if (!container) {
        const container = document.createElement('div')

        if (newId) {
            container.setAttribute('id', newId)
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

export { getRoot }
export default getContainer
