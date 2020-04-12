import { combineReducers } from "redux";
import { appReducer } from "./App/appReducer";
import { authReducer } from "../reducers/Auth/authReducer"
import { userReducer } from "./User/userReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer
})