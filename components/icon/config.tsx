import { iconConfig, newIconConfig } from './types'

let _iconConfig: iconConfig = {
    fontFamily: '',
    classPrefix: '',
    url: ''
}

// 获取icon的css
const getIconCss = (url: string): void => {
    const id = 'uik-icon-css'
    const style = document.getElementById(id)
    if (!style) {
        const newStyle = document.createElement('style')
        newStyle.setAttribute('id', id)
        newStyle.innerText = `@import url(${url});`
        document.head.append(newStyle)
    } else {
        style.innerText = `@import url(${url});`
    }
}

// 配置icon
const config = (newConfig: newIconConfig): void => {
    _iconConfig = { ..._iconConfig, ...newConfig }
    if (newConfig.url) {
        getIconCss(newConfig.url)
    }
}

export { config, _iconConfig }
