import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import { AuthPage } from '../pages/Auth/AuthPage'
import { SignInPage } from '../pages/Auth/SignInPage'
import { BottomMenu } from '../components/App/Menu/BottomMenu' 
import { Header } from './App/Header/Header'
import { SettingsPage } from '../pages/App/SettingsPage'
import { SearchPage } from '../pages/App/SearchPage'

export const useRoutes = isAuth => {
    
    const isMobile = window.innerWidth <= 500

    if (isAuth) {
        return (
            <>
                { isMobile && <BottomMenu /> }
                <Header />
                <div className="appContainer">
                    
                    <Switch>
                        <Route path="/user">
                            
                        </Route>

                        <Route path="/settings">
                            <SettingsPage />
                        </Route>

                        <Route path="/chat">
                            
                        </Route>

                        <Route path="/search">
                            <SearchPage />
                        </Route>

                        <Redirect to="/search" />
                    </Switch>
                </div>
            </>    
        )
    } else {
        return (
            <>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <AuthPage />
                    </Route>

                    <Route path="/sign-in" exact>
                        <SignInPage />
                    </Route>
        
                    <Redirect to="/" />
                </Switch>
            </>
        )
    }
}