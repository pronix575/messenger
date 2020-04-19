import React from 'react'
import { AvatarImage } from '../Settings/AvatarImage'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LOAD_MESSAGES } from '../../redux/types'

export const ChatItem = ({ chat }) => {

    const user = chat.users[0]

    const lastMessage = !!chat.messages.length ? chat.messages[0] : <div className="lastMessage">No messages</div>
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    
    const onClickHandler = async () => {
        try {

            const data = await fetch(`/api/chats/messages/${ chat.shortid }`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${ token }`
                }
            })

            const messages = await data.json()

            dispatch({ type: LOAD_MESSAGES, payload: { messages: messages, shortid: chat.shortid } })

        } catch (e) {
            console.warn(e)
        }
    }
    

    return (
        <NavLink to={ `/chat/${ chat.shortid }` } activeStyle={{ color: "black" }}>
            <div className="chatItem flex-end" onClick={ onClickHandler }>

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
                        
                        <div>
                            { (!!lastMessage.text) ? lastMessage.text : <div>Сообщений нет</div>  }
                        </div>
                    </div>
                </div>
                
            </div>
        </NavLink>    
    )
}