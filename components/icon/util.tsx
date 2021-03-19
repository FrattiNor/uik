// 获取icon的css
const setIconJS = (url: string, id: string): void => {
    const script = document.getElementById(id)
    if (!script) {
        const newScript = document.createElement('script')
        newScript.setAttribute('id', id)
        newScript.setAttribute('src', url)
        document.body.append(newScript)
    } else {
        script.setAttribute('src', url)
    }
}

export { setIconJS }
