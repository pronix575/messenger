import { ADD_USERS_IN_SEARCH, CLEAR_USERS_IN_SEARCH, ADD_ALL_USERS } from "../../types"

const initialState = {
    usersInSearch: [],
    allUsers: []
}

const handlers = {
    [ADD_ALL_USERS]: (state, {payload}) => ({ ...state, allUsers: payload }),
    [ADD_USERS_IN_SEARCH]: (state, { payload }) => ({ ...state, usersInSearch: payload }),
    [CLEAR_USERS_IN_SEARCH]: (state) => ({ ...state, usersInSearch: [] }),
    DEFAULT: state => state
}

export const usersReducer = (state = initialState, action) => {

    const handle = handlers[action.type] || handlers.DEFAULT

    return handle(state, action)
}