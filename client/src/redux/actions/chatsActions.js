import { LOAD_CHATS, CLEAR_DATA } from '../types'

export const

loadChats = chats => dispatch => dispatch({ type: LOAD_CHATS, payload: chats }),
clearChats = () => dispatch => dispatch({  type: CLEAR_DATA})