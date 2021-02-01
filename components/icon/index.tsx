import IconFC from './icon'
import LoadingIcon from './loading-icon'
import CloseIcon from './close-icon'
import { config } from './config'

type IconType = typeof IconFC
interface IconInterFace extends IconType {
    config: typeof config
    LoadingIcon: typeof LoadingIcon
    CloseIcon: typeof CloseIcon
}

const Icon = IconFC as IconInterFace

Icon.config = config
Icon.LoadingIcon = LoadingIcon
Icon.CloseIcon = CloseIcon

export default Icon

export * from './types'
