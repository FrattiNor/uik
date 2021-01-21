const getRoot = (getRootContainer?: () => HTMLElement | null): HTMLElement => {
    return getRootContainer ? getRootContainer() || document.body : document.body
}

export default getRoot
