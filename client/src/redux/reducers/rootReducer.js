import { combineReducers } from "redux";
import { appReducer } from "./App/appReducer";
import { authReducer } from "../reducers/Auth/authReducer"
import { userReducer } from "./User/userReducer";
import { usersReducer } from "./Search/usersReducer"
import { chatsReducer } from "./ChatsReducer/chatsReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    users: usersReducer,
    chats: chatsReducer
})