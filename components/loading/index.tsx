import LoadingFC from './loading'
import LoadingIcon from './loading_icon'

type LoadingType = typeof LoadingFC
interface LoadingInterFace extends LoadingType {
    LoadingIcon: typeof LoadingIcon
}

const Loading = LoadingFC as LoadingInterFace

Loading.LoadingIcon = LoadingIcon
export default Loading
