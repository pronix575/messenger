import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

import { AuthPage } from '../pages/Auth/AuthPage'
import { SignInPage } from '../pages/Auth/SignInPage'
import { SettingsPage } from '../pages/App/SettingsPage'
import { SearchPage } from '../pages/App/SearchPage'
import { UsersPage } from '../pages/App/UsersPage'
import { BottomMenu } from '../components/App/Menu/BottomMenu' 
import { Header } from './App/Header/Header'
import { ChatsPage } from '../pages/App/Chats'
import { ChatPage } from '../pages/App/ChatPage'
import { useSelector } from 'react-redux'

export const useRoutes = isAuth => {

    const isMobile = useSelector(state => state.app.isMobile)


    if (isAuth) {
        return (
            <>
                { isMobile && <BottomMenu /> }
                <Header />
                <div className="appContainer">
                    
                    <Switch>
                        <Route path="/users">
                            <UsersPage />
                        </Route>

                        <Route path="/settings">
                            <SettingsPage />
                        </Route>

                        <Route path="/chats">
                            <ChatsPage />
                        </Route>

                        <Route path="/chat/:id">
                            <ChatPage />
                        </Route>

                        <Route path="/search">
                            <SearchPage />
                        </Route>

                        <Redirect to="/chats" />
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