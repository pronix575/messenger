import { LOG_IN, LOG_OUT } from '../types'
import { request } from '../../http/Request'
import { setAvatar } from './userActions'

const storageName = 'userData'

export const

login = ({ token, userId, shortid, name, email, avatar }) => dispatch => {
    
    localStorage.setItem(storageName, JSON.stringify({
        userId, token, shortid, name, email, avatar
    }))

    dispatch(setAvatar(avatar))
    console.log(avatar)

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
    localStorage.removeItem(storageName)

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
    
    if (data && data.token) {
        dispatch(login(data))
    }
}