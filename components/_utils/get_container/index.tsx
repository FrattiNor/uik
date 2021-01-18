import './index.less'

const getContainer = (): HTMLElement => {
    const id = 'uik-container'
    const containerOut = document.getElementById(id)
    if (!containerOut) {
        const containerOut = document.createElement('div')
        containerOut.setAttribute('id', id)
        containerOut.setAttribute('class', 'uik-container')
        return containerOut
    }
    return containerOut
}

export default getContainer