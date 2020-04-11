import { LOG_IN, LOG_OUT } from '../types'
import { request } from '../../http/Request'

const storageName = 'userData'

export const

login = ({ token, userId, shortid }) => dispatch => {
    
    localStorage.setItem(storageName, JSON.stringify({
        userId, token, shortid
    }))

    return dispatch({ 
        type: LOG_IN, 
        payload: {
            token,
            userId,
            shortid
        }
    })
},

logout = () => dispatch => dispatch({ type: LOG_OUT }),

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