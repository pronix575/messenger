import { LOAD_CHATS, CLEAR_DATA, LOAD_MESSAGES, NEW_MESSAGE } from '../types'

export const

loadChats = chats => dispatch => dispatch({ type: LOAD_CHATS, payload: chats }),
loadMessages = (chat, token) => async dispatch => {
    try {
        const data = await fetch(`/api/chats/messages/${ chat.shortid }`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${ token }`
            }
        })

        const messages = await data.json()

        console.log(await messages)
        dispatch({ 
            type: LOAD_MESSAGES, payload: { 
                messages: await messages,
                shortid: chat.shortid
            } 
        })
        
    } catch (e) {
        
        console.warn(e)
    }    
},
initChats = token => async dispatch => {
    try {

        const data = await fetch('/api/chats/all', {
            method: "GET",
            headers: {
                authorization: `Bearer ${ token }`
            }
        })

        const chats = await data.json()
        return dispatch(loadChats(chats))

    } catch (e) { 
        console.warn(e)
    }
},
newMessage = (message, shortid) => dispatch => dispatch({ type: NEW_MESSAGE, payload: { message, shortid } }),
clearChats = () => dispatch => dispatch({ type: CLEAR_DATA})