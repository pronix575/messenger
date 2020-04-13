import { OPEN_CHANGE_AVATAR_WINDOW, CLOSE_CHANGE_AVATAR_WINDOW } from '../types'

export const 

openChangeAvatarWindow = () => dispatch => dispatch({ type: OPEN_CHANGE_AVATAR_WINDOW }),
closeChangeAvatarWindow = () => dispatch => dispatch({ type: CLOSE_CHANGE_AVATAR_WINDOW })