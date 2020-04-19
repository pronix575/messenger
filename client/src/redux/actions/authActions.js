import { LOG_IN, LOG_OUT } from '../types'
import { request } from '../../http/Request'
import { setAvatar } from './userActions'
import { clearChats, initChats } from './chatsActions'

const storageName = 'userData'

export const

login = ({ token, userId, shortid, name, email, avatar, online }) => dispatch => {
    
    localStorage.setItem(storageName, JSON.stringify({
        userId, token, shortid, name, email, online
    }))
    

    if (avatar) {

        localStorage.setItem('avatar', JSON.stringify(avatar))
        dispatch(setAvatar(avatar))
    }

    dispatch(initChats(token))

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

logout = (token) => async dispatch => {
    
    try { 
        fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${ token }`
            }
        })

    } catch (e) {

    }
    
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
}