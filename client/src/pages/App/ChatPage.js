import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SendMessage } from '../../components/App/Chat/SendMessage'
import { Messages } from '../../components/App/Chat/Messages'
import { socket } from '../../sockets/socket'
import { LOAD_MESSAGES } from '../../redux/types'

export const ChatPage = () => {
    useEffect(() => async () => {
        try {

            const data = await fetch(`/api/chats/messages/${ chat.shortid }`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${ token }`
                }
            })

            const messages = await data.json()

            dispatch({ type: LOAD_MESSAGES, payload: { messages: messages, shortid: chatId } })

        } catch (e) {
            console.warn(e)
        }
        
    }, [])
    
    const chatId = useParams().id 

    const chat = useSelector(state => state.chats.chats.find( chat => chat.shortid === chatId ))
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()

    const [form, setForm] = useState({
        message: ''
    })



    const onSubmitkHandler = event => { 
        event.preventDefault()

        // setForm({ ...form, [event.target.name]: event.target.value })

        socket.emit('sendMessage', {
            shortid: chatId,
            text: form.message,
            date: Date.now(),
            token,
            to_id: chat.users[0].shortid
        })
    }

    const onChangeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className="flex">
                <div className="ChatPage flex-end" style={{ width: "100%", padding: "0 15px" }}>
                

                { !!chat ?
                    
                    <Messages messages={ chat.messages } />  :
                    <div></div>

                }
                    <SendMessage 
                        onSubmitHandler={ onSubmitkHandler } 
                        onChangeHandler={ onChangeHandler }
                    />
                </div>
        </div>
    )
}