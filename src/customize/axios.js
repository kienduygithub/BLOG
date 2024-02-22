import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import * as authService from '../services/authService';
import store from '../store/redux/store';
import * as actions from '../store/actions'
const customAxios = axios.create({
    // baseURL: 'http://localhost:3001/api',
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true
})

const isJSONString = (token) => {

    try {
        JSON.parse(token)

    } catch (error) {
        return false
    }
    return true;
}
const jwtDecodeHandle = (token) => {
    let access_token = localStorage.getItem('access_token');
    let decoded = {};
    console.log(typeof access_token)
    if (access_token && isJSONString(access_token)) {
        console.log('===')
        access_token = JSON.parse(access_token);
        decoded = jwtDecode(access_token);
        console.log('decoded', decoded);
    }
    return decoded;
}
// Add a request interceptor
customAxios.interceptors.request.use(
    async (config) => {
        let access_token = localStorage.getItem('access_token');
        if (access_token) {
            config.headers.Authorization = `Bearer ${ access_token }`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
customAxios.interceptors.response.use(
    (response) => {
        // console.log('response', response);
        return response;
    },
    async (error) => {
        console.log('error: ', error)
        if (error.response && error.response.status === 401) {
            try {
                const response = await axios.get(`http://localhost:3001/api/auth/refresh_token`, {
                    withCredentials: true
                })
                if (response && response.data && response.data.access_token) {
                    error.config.headers.Authorization = `Bearer ${ response.data.access_token }`
                }
                return axios(error.config);
            } catch (error) {
                alert('Hết hạn đăng nhập!');
                store.dispatch(actions.resetUserInfoSuccess());
                localStorage.removeItem('access_token');
                await authService.handleLogout()
                window.location.href = '/login';
                return error;
            }
        }
        console.log('error response: ', error)
        return Promise.reject(error);
    }
);

export default customAxios;
