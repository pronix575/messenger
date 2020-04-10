import { LOG_IN, LOG_OUT } from "../../types"

const initialState = {
    isAuth: false,
    token: null,
    userId: null
}

const handlers = {
    [LOG_IN]: (state, { payload }) => ({ 
        ...state, 
        isAuth: true, 
        token: payload.token, 
        userId: payload.userId 
    }),
    [LOG_OUT]: state => ({ ...state, isAuth: false }),
    DEFAULT: state => state
}

export const authReducer = (state = initialState, action) => {

    const handle = handlers[action.type] || handlers.DEFAULT

    return handle(state, action)
}