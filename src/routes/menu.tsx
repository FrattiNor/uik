// import LazyLoad from '@/components/lazy_load'

// 总路由
const routes = [
    {
        path: '/',
        component: require('@/layouts/basic_layout'),
        routes: [
            {
                path: '/uik',
                title: '组件',
                component: require('@/pages/uik'),
                routes: [
                    {
                        path: '/uik/:id'
                    }
                ]
            },
            {
                path: '/test',
                title: '测试',
                component: require('@/pages/test'),
            },
            {
                redirect: '/uik'
            }
        ]
    }
]

export default routes
