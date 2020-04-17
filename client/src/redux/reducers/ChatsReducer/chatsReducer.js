import { LOAD_CHATS, CLEAR_DATA } from "../../types"

const initialState = {
    chats: []
}

const handlers = {
    [LOAD_CHATS]: ( state, { payload } ) => ({ ...state, chats: payload }),
    [CLEAR_DATA]: state => ({ ...state, chats: [] }),
    DEFAULT: state => state
}

export const chatsReducer = (state = initialState, action) => {

    const handle = handlers[action.type] || handlers.DEFAULT

    return handle(state, action)
}