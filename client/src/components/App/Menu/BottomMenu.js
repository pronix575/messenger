import React from 'react'
import './Menu.scss'
import { UserIcon } from '../Icons/UserIcon'
import { GearIcon } from '../Icons/GearIcon'
import { SearchIcon } from '../Icons/SearchIcon'
import { ChatIcon } from '../Icons/ChatIcon'
import { NavLink } from 'react-router-dom'

export const BottomMenu = () => {
    return (
        <div className="BottomMenuContainer">
            <div className="BottomMenu">
                <NavLink to="/chat" activeStyle={{ "color": "white" }}>
                    <ChatIcon />
                </NavLink>
                <NavLink to="/search" activeStyle={{ "color": "white" }}>
                    <SearchIcon />
                </NavLink>
                <NavLink to="/users" activeStyle={{ "color": "white" }}>
                    <UserIcon />
                </NavLink>
                <NavLink to="/settings" activeStyle={{ "color": "white" }}>
                    <GearIcon />
                </NavLink>
            </div>
        </div>
    )
}
