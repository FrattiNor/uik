import { ComponentType, FC } from 'react'
import Empty from '@/components/empty-component'
import ReactLoadable from './react-loadable'
import ReactLazyLoad from './react-lazy'

const LazyLoad = (loader: () => Promise<{ default: ComponentType<any> }>, type: 'react' | 'loadable', Loading?: FC): FC => {
    switch (type) {
        case 'react':
            return ReactLazyLoad(loader, Loading)
        case 'loadable':
            return ReactLoadable(loader, Loading)
        default:
            return Empty
    }
}

export default LazyLoad
