import { SET_DEVICE_TYPE } from "../../types"

const initialState = {
    isMobile: true
}

const handlers = {
    [SET_DEVICE_TYPE]: (state, { payload }) => ({ ...state, isMobile: payload }),
    DEFAULT: state => state
}

export const appReducer = (state = initialState, action) => {

    const handle = handlers[action.type] || handlers.DEFAULT

    return handle(state, action)
}