import React from 'react'
import { AvatarImage } from '../Settings/AvatarImage'

export const User = ({ user }) => 
    <div className="userItem flex" key={ user.shortid } style={{ "justifyContent": "space-between" }}>
        <div style={{ cursor: "pointer" }} className="settingsAvatar">
            <AvatarImage 
                imageurl={ user.avatar }
                styles={{ 
                    "minWidth": "40px", 
                    "height": "40px", 
                    "borderRadius": "8px", "fontSize": "40px" 
                }} 
                />
        </div>
        
        <h3>{ user.name }</h3>
        <p>{ user.shortid }</p>
    </div>