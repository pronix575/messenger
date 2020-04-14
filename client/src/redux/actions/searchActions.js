import { ADD_USERS_IN_SEARCH, CLEAR_USERS_IN_SEARCH } from "../types";

export const

addUsersInSerach = users => dispatch => dispatch({ type: ADD_USERS_IN_SEARCH, payload: users }),
clearUsersInSearch = () => dispatch => dispatch({ type: CLEAR_USERS_IN_SEARCH })