import React, { useState, useCallback, useEffect } from 'react'
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

    if (!chat) {
        dispatch(initChats(token))
    } 
     
    
    const [form, setForm] = useState({
        message: ''
    })

    useEffect( () => async() => {
        console.log(chat)
        
        try {
            const data = await fetch(`/api/chats/messages/${ chat.shortid }`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${ token }`
                }
            })

            const messages = data.json()
            console.log(messages)
        } catch (e) {
            console.warn(e)
        }    

    }, [socket, chat, form])


    const onSubmitkHandler = useCallback( async event => { 
        event.preventDefault()

        setForm({ ...form, [event.target.name]: event.target.value })

        socket.emit('sendMessage', {
            shortid: chatId,
            text: form.message,
            date: new Date(),
            token
        })
    }, [form, setForm])



    const onChangeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    

    return (
        <div className="flex">
                <div className="ChatPage flex-end" style={{ width: "100%", padding: "0 15px" }}>
                

                { !!chat ?
                    
                    // <Messages messages={ messages } />  :
                    <div></div> : <div></div>

                }
                    <SendMessage 
                        onSubmitHandler={ onSubmitkHandler } 
                        onChangeHandler={ onChangeHandler }
                    />
                </div>
        </div>
    )
}