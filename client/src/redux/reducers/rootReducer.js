import { combineReducers } from "redux";
import { appReducer } from "./App/appReducer";
import { authReducer } from "../reducers/Auth/authReducer"

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})