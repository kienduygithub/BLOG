import actionTypes from '../actions/actionTypes'

const initialState = {
    count: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREASE_COUNTER:
            state.count = state.count + 1;
            return {
                ...state
            }
        case actionTypes.DECREASE_COUNTER:
            state.count = state.count - 1;
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}
export default reducer