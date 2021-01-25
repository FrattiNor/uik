import IconFC from './icon'
import { config } from './config'

type IconType = typeof IconFC
interface IconInterFace extends IconType {
    config: typeof config
}

const Icon = IconFC as IconInterFace

Icon.config = config

export default Icon

export * from './types'
