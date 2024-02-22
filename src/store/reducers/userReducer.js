import actionTypes from "../actions/actionTypes";

const initialState = {
    username: '',
    email: '',
    image: '',
    access_token: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_USER_INFO_SUCCESS:
            const userInfo = action.data;
            state.id = userInfo.id;
            state.username = userInfo.username;
            state.email = userInfo.email;
            state.image = userInfo.image;
            state.access_token = userInfo.access_token;
            return {
                ...state
            }
        case actionTypes.SAVE_USER_INFO_FAILED:
            return {
                ...state
            }
        case actionTypes.RESET_USER_INFO_SUCCESS:
            state.id = '';
            state.username = '';
            state.email = '';
            state.image = '';
            state.access_token = '';
            return {
                ...state
            }
        case actionTypes.RESET_USER_INFO_FAILED:
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;