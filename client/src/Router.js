import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import { AuthPage } from './pages/AuthPage'

export const useRoutes = isAuth => {
    
    if (isAuth) {
        return (
            <h1>You are auth</h1>
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
    
                <Redirect to="/" />
            </Switch>
        )
    }
}