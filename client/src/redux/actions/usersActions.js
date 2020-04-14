import { ADD_USERS_IN_SEARCH, CLEAR_USERS_IN_SEARCH, ADD_ALL_USERS } from "../types";

export const

addUsersInSerach = users => dispatch => dispatch({ type: ADD_USERS_IN_SEARCH, payload: users }),
clearUsersInSearch = () => dispatch => dispatch({ type: CLEAR_USERS_IN_SEARCH }),
addAllUsers = users => dispatch => dispatch({ type: ADD_ALL_USERS, payload: users })
