import React, { useState } from 'react'
import { AvatarImage } from '../Settings/AvatarImage'
import { Button } from '../App/Button/Button'
import { ChatIcon } from '../App/Icons/ChatIcon'

export const User = ({ user }) => {

    const [open, setOpen] = useState(false)

    const onClickHandler = () => setOpen(!open)

    const onCkickChatButtonHandler = () => {

    }

    return (
        <div onClick={ onClickHandler } className="userContainer">
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
                <p>{ user.email }</p>
            </div>

            { open && 
                <>
                    <div className="flex-end" style={{ padding: "10px 0px 5px 0px" }}>

                    <p>{ user.shortid }</p>
                        <Button action={ onCkickChatButtonHandler } text={ <ChatIcon /> } styles={{ background: "#3550ff", color: "white" }} />
                    </div> 
                    {/* <hr/> */}
                </>
            } 
        </div>
    )    
}    