import React from 'react'
import ReactDom from 'react-dom'
import Routes from '@/routes'
import { Icon } from 'uik'
import './index.less'

Icon.config({
    fontFamily: 'iconfont',
    url: '//at.alicdn.com/t/font_2300539_ay4u5ems9a.css'
})

ReactDom.render(<Routes />, document.getElementById('root'))


// import { Provider } from 'react-redux'
// import dva from '@/utils/dva'

// const app = dva()
// const store = app.getStore()

// ReactDom.render(
//     <Provider store={store}>
//         <Routes app={app} />
//     </Provider>,
//     document.getElementById('root')
// )