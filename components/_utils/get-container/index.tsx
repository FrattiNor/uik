import './index.less'

type containerProps = {
    id?: string
    classname?: string
    containerType?: 'fixed' | 'absolute'
    zIndex?: number
    root?: HTMLElement
}

const getDefaultRoot = (): HTMLElement => {
    return document.body
}

const getRootById = (rootId?: string): HTMLElement => {
    return rootId ? document.getElementById(rootId) || getDefaultRoot() : getDefaultRoot()
}

const getContainer = ({ id, classname, containerType, zIndex, root }: containerProps): HTMLElement => {
    const trueRoot = root || getRootById()

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
            trueRoot.append(containerOut)
        } else {
            trueRoot.append(container)
        }

        return container
    }

    return container
}

export { getRootById, getDefaultRoot }
export default getContainer
