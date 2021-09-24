import React from 'react'
import ReactDom from 'react-dom'
import Routes from '@/routes'
import { message } from 'uik'
import './index.less'

message.config({
    duration: 3,
})

ReactDom.render(<Routes />, document.getElementById('root'))