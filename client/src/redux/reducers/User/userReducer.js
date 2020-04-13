import { SET_AVATAR, CLOSE_CHANGE_AVATAR_WINDOW, OPEN_CHANGE_AVATAR_WINDOW } from '../../types'

const initialState = {
    avatarUrl: '',
    changeAvatarWindow: false
}

const handlers = {
    [SET_AVATAR]: (state, { payload }) => ({ ...state, avatarUrl: payload}),
    [CLOSE_CHANGE_AVATAR_WINDOW]: state => ({ ...state, changeAvatarWindow: false }),
    [OPEN_CHANGE_AVATAR_WINDOW]: state => ({ ...state, changeAvatarWindow: true }),
    DEFAULT: state => state
}

export const userReducer = (state = initialState, action) => {

    const handle = handlers[action.type] || handlers.DEFAULT

    return handle(state, action)
}