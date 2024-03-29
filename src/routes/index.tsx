interface RouteList {
    path?: string
    component?: any
    routes?: any[]
    redirect?: string
    title?: string
    models?: string[]
}

import React, { ReactElement } from 'react'
import ReactDocumentTitle from 'react-document-title'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import { loadModel, getComponent } from './utils'
import menu from './menu'
import menuDev from './menuDev'

const env = process.env.NODE_ENV
const useMenu = env === 'development' ? menuDev : menu

// 递归渲染路由
const Routes = ({ app }: { app?: any }): ReactElement => {
    const renderRoute = (list: any): ReactElement => {
        const renderRouteDom = list.map(({ path, component, routes, redirect, title = '', models }: RouteList) => {
            // 加载model
            if (models && app) {
                loadModel(models, app)
            }

            // 重定向
            if (redirect) {
                if (path) {
                    return <Redirect key={`${redirect} ${path}`} path={path} exact to={redirect} />
                } else {
                    return <Redirect key={redirect} to={redirect} />
                }
            }

            // 渲染route
            const Component = getComponent(component)
            const child = Array.isArray(routes) ? routes.filter(({ redirect }) => !redirect) : []
            const hasChild = child.length > 0

            return (
                <Route
                    key={path}
                    path={path}
                    exact={!hasChild}
                    render={(props: any): ReactElement => (
                        <ReactDocumentTitle title={title}>
                            <Component {...props} child={child}>
                                {hasChild && renderRoute(routes)}
                            </Component>
                        </ReactDocumentTitle>
                    )}
                />
            )
        })

        return <Switch>{renderRouteDom}</Switch>
    }

    return <BrowserRouter>{renderRoute(useMenu)}</BrowserRouter>
}

export default Routes
