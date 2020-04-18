import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadChats, initChats } from '../../redux/actions/chatsActions'
import { ChatItem } from '../../components/Chat/ChatItem'

export const ChatsPage = () => {

    const token = useSelector(state => state.auth.token)
    const chats = useSelector(state => state.chats.chats)

    const dispatch = useDispatch()

    useEffect(() => { 
        dispatch(initChats(token))
    
    }, [initChats, dispatch])
        
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