import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadChats } from '../../redux/actions/chatsActions'
import { ChatItem } from '../../components/Chat/ChatItem'

export const ChatsPage = () => {

    const token = useSelector(state => state.auth.token)
    const chats = useSelector(state => state.chats.chats)

    const dispatch = useDispatch()


    const initChats = useCallback(async() => {
        try {

            const data = await fetch('/api/chats/all', {
                method: "GET",
                headers: {
                    authorization: `Bearer ${ token }`
                }
            })

            const chats = await data.json()
            dispatch(loadChats(chats))

        } catch (e) {
            console.warn(e)
        }
    }, [token, dispatch])

    useEffect(() => { 
        initChats() 
    
    }, [initChats])
        
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