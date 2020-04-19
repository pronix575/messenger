import React from 'react'
import { useSelector } from 'react-redux'
import { ChatItem } from '../../components/Chat/ChatItem'

export const ChatsPage = () => {

    const chats = useSelector(state => state.chats.chats)
        
    return (
        <div className="flex">
            <div className="ChatsPage flex">
                { !!chats.length &&
                    <div className="chatsContainer">
                        { chats.map(chat => <ChatItem key={ chat.shortid } chat={ chat } />) }
                    </div>
                }
            </div>
        </div>    
    )
}