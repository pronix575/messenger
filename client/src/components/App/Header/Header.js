import React from 'react'

import { useSelector } from 'react-redux'
import { NavLink, Switch, Route } from 'react-router-dom'

import { Button } from '../Button/Button'
import './Header.scss'
import { AvatarImage } from '../../Settings/AvatarImage'
import { TopMenu } from '../Menu/TopMenu'

export const Header = () => {

    const { isAuth } = useSelector(state => state.auth)
    
    const isMobile = window.innerWidth <= 500

    const loginChangeButton = 
        <Switch>
            <Route path="/" exact>
                <NavLink to="/sign-in" style={{ textDecoration: 'none' }}><Button text={ "sign in" }></Button></NavLink>
            </Route>

            <Route path="/sign-in">
                <NavLink to="/" style={{ textDecoration: 'none' }}><Button text={ "register" }></Button></NavLink>
            </Route>
        </Switch>

    return (
        <div className="header container">
            <div className="content-container">
                <div className="flex">
                    <svg className="bi bi-chat-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 008 15z"/>
                    </svg>

                    <h3>messenger</h3>
                </div>
                
                <div className="flex">
                    { (isAuth && !isMobile) && <TopMenu /> }

                    { isAuth ? <AvatarImage styles={{ fontSize: "25px" }} classList={ "flex" } /> : loginChangeButton }
                </div>

            </div>
        </div>
    )
}