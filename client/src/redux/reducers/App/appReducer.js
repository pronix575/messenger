const initialState = {}

const handlers = {
    DEFAULT: state => state
}

export const appReducer = (state = initialState, action) => {

    const handle = handlers[action.type] || handlers.DEFAULT

    return handle(state, action)
}