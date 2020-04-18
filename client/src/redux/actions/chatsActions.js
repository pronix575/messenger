import { LOAD_CHATS, CLEAR_DATA } from '../types'

export const

loadChats = chats => dispatch => dispatch({ type: LOAD_CHATS, payload: chats }),
initChats = token => async dispatch => {
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
},
clearChats = () => dispatch => dispatch({  type: CLEAR_DATA})