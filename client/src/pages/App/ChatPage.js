import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/App/Button/Button'
import { CursorPointer } from '../../components/App/Icons/CursorPointer'
import { AvatarImage } from '../../components/Settings/AvatarImage'
import { useSelector } from 'react-redux'

export const ChatPage = () => {
    
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        setIsMobile((window.innerWidth <= 500) ? true : false) 
        
        window.addEventListener("resize", () => {
            setIsMobile((window.innerWidth <= 500) ? true : false) 
        })
    }, [isMobile, setIsMobile])
    
    const chatStyle = (isMobile) ? {} : { height: "calc(100vh - 70px)" }
    
    const chatId = useParams().id 
    const chat = useSelector(state => state.chats.chats.find( chat => chat.shortid === chatId ))

    return (
        <div className="flex">
            { !!chat &&
                <div className="ChatPage flex-end" style={ chatStyle } style={{ width: "100%", padding: "0 15px" }}>
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

                    <div className="sendMessageContainer">
                        <form className="sendMessageForm">
                            <div className="flex-end" styles={{ margin: "15px 0 0 0" }}> 
                                <input className="searchField" name="search"></input>
                                <Button text={ <CursorPointer /> } styles={{ padding: "10px"}} />
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}