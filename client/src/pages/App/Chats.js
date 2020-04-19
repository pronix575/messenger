import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ChatItem } from '../../components/Chat/ChatItem'
import { initChats } from '../../redux/actions/chatsActions'

export const ChatsPage = () => {

    const chats = useSelector(state => state.chats.chats)
    const token = useSelector(state => state.auth.token)    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initChats(token))
    }, [dispatch, token])

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