import React from 'react'
import ReactDom from 'react-dom'
import Routes from '@/routes'
import { message } from 'uik'
import './index.less'

message.config({
    duration: 3
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
