import { LOG_IN, LOG_OUT } from '../types'

const storageName = 'userData'

export const

login = (token, userId) => dispatch => {
    
    localStorage.setItem(storageName, JSON.stringify({
        userId, token
    }))

    return dispatch({ 
        type: LOG_IN, 
        payload: {
            token,
            userId
        }
    })
},

logout = () => dispatch => dispatch({ type: LOG_OUT }),

authInit = () => {

    const data = JSON.parse(localStorage.getItem(storageName))
    
    if (data && data.token) {
        login(data.token, data.userId)
    }
}