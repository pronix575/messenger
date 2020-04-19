import { LOAD_CHATS, CLEAR_DATA, LOAD_MESSAGES, NEW_MESSAGE } from "../../types"

const initialState = {
    chats: []
}

const handlers = {
    [LOAD_CHATS]: ( state, { payload } ) => ({ ...state, chats: payload }),
    [LOAD_MESSAGES]: ( state, { payload }) => ({ ...state, chats: state.chats.map( chat => {
        if ( chat.shortid === payload.shortid ) {
            chat.messages = payload.messages
            return chat
        }
        
        return chat

    })}),
    [CLEAR_DATA]: state => ({ ...state, chats: [] }),
    [NEW_MESSAGE]: (state, { payload }) => {

        const chats = state.chats.map( chat => {
            if (chat.shortid === payload.shortid) {

                chat.messages.unshift( payload.message )
                return chat
            
            }
            
            return chat
        })

        return {
            ...state,
            chats            
        } 
    },
    DEFAULT: state => state
}

export const chatsReducer = (state = initialState, action) => {

    const handle = handlers[action.type] || handlers.DEFAULT

    return handle(state, action)
}