import React, { useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SendMessage } from '../../components/App/Chat/SendMessage'
import { Messages } from '../../components/App/Chat/Messages'
import { socket } from '../../sockets/socket'
import { initChats } from '../../redux/actions/chatsActions'

export const ChatPage = () => {
    
    const chatId = useParams().id 

    const chat = useSelector(state => state.chats.chats.find( chat => chat.shortid === chatId ))
    const token = useSelector(state => state.auth.token)    
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(initChats(token))
    }, [dispatch, token])
    // const dispatch = useDispatch()

    const [form, setForm] = useState({
        message: ''
    })

    const onSubmitkHandler = event => { 
        event.preventDefault()

        if (!!chat) {
            socket.emit('sendMessage', {
                shortid: chatId,
                text: form.message,
                date: Date.now(),
                token,
                to_id: chat.users[0].shortid
            })
            
            setForm({ message: '' })
        } else {
            dispatch(initChats(token))
        }
    }

    const onChangeHandler = event => {
        setForm({ ...form, message: event.target.value })
    }

    return (
        <div className="flex">
                <div className="ChatPage flex-end" style={{ width: "100%", padding: "0 15px" }}>
                
                { !!chat &&
                    !!chat.messages.length ?
                        
                        <Messages messages={ chat.messages } />  :
                        <div style={{ color: "white", "padding": "15px 0 0 0" }}>Сообщений пока нет</div>
                }
                    <SendMessage
                        value={ form.message } 
                        onSubmitHandler={ onSubmitkHandler } 
                        onChangeHandler={ onChangeHandler }
                    />
                </div>
        </div>
    )
}