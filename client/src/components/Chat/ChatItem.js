import React from 'react'
import { AvatarImage } from '../Settings/AvatarImage'
import { NavLink } from 'react-router-dom'

export const ChatItem = ({ chat }) => {

    const user = chat.users[0]

    const lastMessage = !!chat.messages.length ? chat.messages[0] : <div className="lastMessage">No messages</div>
    
    
    return (
        <NavLink to={ `/chat/${ chat.shortid }` } activeStyle={{ color: "black" }}>
            <div className="chatItem flex-end">

                <AvatarImage 
                    imageurl={ user.avatar } 
                    styles={{ 
                        "minWidth": "40px", 
                        "height": "40px", 
                        "borderRadius": "8px", "fontSize": "40px" 
                    }} 
                />

                <div className="flex-end chatUserData">
                    <div className="flex-end">
                        <div style={{ width: "100%", fontWeight: "bold" }}>
                            { user.name }
                        </div>
                        
                        <div className="flex-end">
                            { lastMessage }
                        </div>
                    </div>
                </div>
                
            </div>
        </NavLink>    
    )
}