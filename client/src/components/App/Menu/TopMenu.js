import React from 'react'
import { NavLink } from 'react-router-dom'

export const TopMenu = () => 

    <div className="TopMenu flex" style={{ background: "none" }}>
        <NavLink to="/chat" activeStyle={{ "color": "white" }}>
            <p>chats</p>
        </NavLink>
        
        <NavLink to="/search" activeStyle={{ "color": "white" }}>
            <p>search</p>
        </NavLink>
        
        <NavLink to="/user" activeStyle={{ "color": "white" }}>
            <p>users</p>
        </NavLink>

        <NavLink to="/settings" activeStyle={{ "color": "white" }}>
            <p>settings</p>
        </NavLink>
    </div>