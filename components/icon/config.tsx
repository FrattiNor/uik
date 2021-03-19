import { iconConfig, newIconConfig } from './types'

let _iconConfig: iconConfig = {
    prefix: '',
    url: ''
}

// 获取icon的css
const getIconJS = (url: string): void => {
    const id = 'uik-icon-js'
    const script = document.getElementById(id)
    if (!script) {
        const newScript = document.createElement('script')
        newScript.setAttribute('id', id)
        newScript.setAttribute('src', url)
        document.head.append(newScript)
    } else {
        script.setAttribute('src', url)
    }
}

// 配置icon
const config = (newConfig: newIconConfig): void => {
    _iconConfig = { ..._iconConfig, ...newConfig }
    if (newConfig.url) {
        getIconJS(newConfig.url)
    }
}

export { config, _iconConfig }
