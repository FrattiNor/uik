const getDefaultRoot = (): HTMLElement => {
    return document.body
}

const getRootById = (rootId?: string): HTMLElement => {
    return rootId ? document.getElementById(rootId) || getDefaultRoot() : getDefaultRoot()
}

export { getDefaultRoot, getRootById }
