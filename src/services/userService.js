import customAxios from '../customize/axios';

export const getDetailsUser = async (userId, access_token) => {
    try {
        const response = await customAxios.get(`/user/get-details?id=${ userId }`, {
            headers: `Bearer ${ access_token }`
        })
        return response.data;
    } catch (error) {
        console.log('Got trouble: ', error);
    }
}