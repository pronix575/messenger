import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import { AuthPage } from '../pages/AuthPage'
import { SignInPage } from '../pages/SignInPage'

export const useRoutes = isAuth => {
    
    if (isAuth) {
        return (
            <Switch>
                <Route path="/user">
                    <div style={{ padding: "50px 20px", "color": "white" }}>Hello</div>
                </Route>

                <Redirect to="/user" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>

                <Route path="/sign-in" exact>
                    <SignInPage />
                </Route>
    
                <Redirect to="/" />
            </Switch>
        )
    }
}