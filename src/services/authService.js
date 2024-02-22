import axios from "axios";
import customAxios from "../customize/axios";

export const handleSignUp = async (data) => {
    const response = await axios.post('http://localhost:3001/api/auth/sign-up', data);
    return response.data;
}

export const handleLogin = async (data) => {
    const response = await axios.post(`${ process.env.REACT_APP_SERVER_URL }/auth/sign-in`, data, {
        withCredentials: true
    });
    return response.data;
}

export const handleLogout = async () => {
    const response = await axios.get(`${ process.env.REACT_APP_SERVER_URL }/auth/logout`, {
        withCredentials: true
    });
    return response.data;
}