import React from 'react'
import ReactDOM from 'react-dom'
import Container from '../_components/container'

// 寻找容器
const getContainer = (id: string): HTMLElement | null => {
    return document.getElementById(id)
}

type container = { id: string; className: string }
// 创建容器
const createContainer = ({ id, className }: container): HTMLElement | null => {
    if (!getContainer(id)) {
        const container_out = document.createElement('div')
        const container = <Container id={id} />
        ReactDOM.render(container, container_out)
        document.body.append(container_out)
    }

    const container = getContainer(id)
    container?.setAttribute('class', className)

    return container
}

export { createContainer }
