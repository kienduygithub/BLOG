import actionTypes from './actionTypes';

// export const saveUserInfo = (userInfo) => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(saveUserInfoSuccess(userInfo));
//             return {
//                 type: ''
//             }
//         } catch (error) {
//             dispatch(saveUserInfoFailed());
//         }
//     }
// }

export const saveUserInfoSuccess = (userInfo) => ({
    type: actionTypes.SAVE_USER_INFO_SUCCESS,
    data: userInfo
})

export const saveUserInfoFailed = () => ({
    type: actionTypes.SAVE_USER_INFO_FAILED
})

export const resetUserInfoSuccess = () => ({
    type: actionTypes.RESET_USER_INFO_SUCCESS
})

export const resetUserInfoFailed = () => ({
    type: actionTypes.RESET_USER_INFO_FAILED
})