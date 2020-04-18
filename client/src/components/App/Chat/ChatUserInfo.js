import React from 'react'
import { AvatarImage } from '../../Settings/AvatarImage'

export const ChatUserInfo = ({ chat }) => 
    <div style={{ width: "100%", maxWidth: "450px" }}>
        <div className="ChatUserInfo">
            
            <div className="flex-end">
                <AvatarImage
                    imageurl={ chat.users[0].avatar } 
                    styles={{ 
                        "minWidth": "25px", 
                        "height": "25px", 
                        "borderRadius": "100px", "fontSize": "25px" 
                    }} 
                />

                <div className="chatUserName">
                    { chat.users[0].name }
                </div>
            </div>  
                
        </div>
    </div>