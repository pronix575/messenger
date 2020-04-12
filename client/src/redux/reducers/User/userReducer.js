import { SET_AVATAR } from '../../types'

const initialState = {
    avatarUrl: ''
}

const handlers = {
    [SET_AVATAR]: (state, { payload }) => ({...state, avatarUrl: payload}),
    DEFAULT: state => state
}

export const userReducer = (state = initialState, action) => {

    const handle = handlers[action.type] || handlers.DEFAULT

    return handle(state, action)
}