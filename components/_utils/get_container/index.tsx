import './index.less'

type containerType = 'fixed'

const getContainer = (type?: containerType): HTMLElement => {
    const id = type ? `uik-${type}-container` : 'uik-container'
    const containerOut = document.getElementById(id)
    if (!containerOut) {
        const containerOut = document.createElement('div')
        containerOut.setAttribute('id', id)
        if (type) {
            containerOut.setAttribute('class', id)
        }
        return containerOut
    }
    return containerOut
}

export default getContainer
