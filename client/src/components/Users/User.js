import React, { useState, useCallback } from 'react'
import { AvatarImage } from '../Settings/AvatarImage'
import { Button } from '../App/Button/Button'
import { ChatIcon } from '../App/Icons/ChatIcon'
import { OnlineStatus } from '../App/Status/OnlineStatus'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Loader } from '../App/Loaders/Loader'

export const User = ({ user }) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onClickHandler = () => setOpen(!open)

    const token = useSelector(state => state.auth.token)
    const history = useHistory()

    const onCkickChatButtonHandler = useCallback(async () => {
        setOpen(true)
        setLoading(true)

        try {
            console.log(user.shortid)
            const data = await fetch('/api/chats/start_chatting', {
                method: 'POST',
                
                headers: {
                    authorization: `Bearer ${ token }`,
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({
                    shortid: user.shortid
                }),
            })

            const chat = await data.json()

            if (chat.shortid) {
                history.push(`/chat/${ chat.shortid }`)
            } else {
                alert('В этой версии возможность писать себе отключена, ибо нефиг')
            }
            setLoading(false)

        } catch (e) {
            setLoading(false)
            console.warn(e)
        }
    }, [token, user, history])

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
                
                <h3 className="flex-end">{ user.name } { user.online &&  <OnlineStatus /> } </h3>
                <p>{ user.email }</p>
            </div>

            { open && 
                <>
                    <div className="flex-end" style={{ padding: "10px 0px 5px 0px" }}>

                    <p>{ user.shortid }</p>
                        
                        <Button action={ onCkickChatButtonHandler } text={ loading ? <Loader /> : <ChatIcon /> } styles={{ background: "#3550ff", color: "white" }} />
                        
                    </div> 
                    {/* <hr/> */}
                </>
            } 
        </div>
    )    
}    