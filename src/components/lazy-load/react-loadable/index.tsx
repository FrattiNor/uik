import { FC, ComponentType } from 'react'
import Loadable from 'react-loadable'
import DefaultLoading from '@/components/lazy-load/default-loading'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>, Loading?: FC): FC =>
    Loadable({
        loader,
        loading: Loading || DefaultLoading
    })

export default LazyLoad
