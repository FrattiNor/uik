import IconFC, { config } from './icon'

type IconType = typeof IconFC
interface IconInterFace extends IconType {
    config: typeof config
}

const Icon = IconFC as IconInterFace

Icon.config = config

export default Icon

export * from './types'