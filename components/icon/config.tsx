import { iconConfig, newIconConfig } from './types'
import { setIconJS } from './util'

let _iconConfig: iconConfig = {
    prefix: '',
    url: ''
}

// 配置icon
const config = (newConfig: newIconConfig): void => {
    _iconConfig = { ..._iconConfig, ...newConfig }
    if (newConfig.url) {
        setIconJS(newConfig.url, 'uik-icon-js')
    }
}

export { config, _iconConfig }
