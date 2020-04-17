import { LOG_IN, LOG_OUT } from '../types'
import { request } from '../../http/Request'
import { setAvatar } from './userActions'
import { loadChats, clearChats } from './chatsActions'
import { useSelector } from 'react-redux'

const storageName = 'userData'

export const

login = ({ token, userId, shortid, name, email, avatar }) => dispatch => {
    
    localStorage.setItem(storageName, JSON.stringify({
        userId, token, shortid, name, email
    }))
    

    if (avatar) {

        localStorage.setItem('avatar', JSON.stringify(avatar))
        dispatch(setAvatar(avatar))
    }


    return dispatch({ 
        type: LOG_IN, 
        payload: {
            token,
            userId,
            shortid,
            name,
            email
        }
    })
},

logout = () => dispatch => {
    localStorage.clear()

    dispatch(clearChats())

    return dispatch({ type: LOG_OUT })
},

register = async (form) => {
    try {

        const data = await request('/api/auth/register', 'POST', { ...form })

        return data

    } catch (e) {

        throw e
    }
},

authInit = () => dispatch => {

    const data = JSON.parse(localStorage.getItem(storageName))
    const avatar = JSON.parse(localStorage.getItem('avatar'))
    
    if (data && data.token) {
        dispatch(login(data))
        dispatch(setAvatar(avatar))
    }
},

loadData = (token) => async dispatch => {
    try {
        const token = useSelector(state => state.auth.token)
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
}