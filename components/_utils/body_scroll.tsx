const setBodyScroll = (canScroll: boolean): void => {

    if (canScroll) {
        document.body.style.overflow = 'auto'
    } else {
        document.body.style.overflow = 'hidden'
    }
}

export default setBodyScroll
