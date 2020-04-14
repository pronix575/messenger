import { SET_AVATAR } from "../types";

export const 

setAvatar = (avatarUrl) => dispatch => { 

    localStorage.setItem('avatar', JSON.stringify(avatarUrl))

    return dispatch({ type: SET_AVATAR, payload: avatarUrl }) 
}
