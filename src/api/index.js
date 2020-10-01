import axios from 'axios';
import {BASE_URL} from './../constants';

export const login = async (data) => {
    const res = await axios.post(BASE_URL + "auth/login", data);
    return res.data;
}

export const userCreate = async () => {
    const res = await axios.get(BASE_URL + "users/create");
    return res.data;
}

export const userStore = async (data) => {
    const res = await axios.post(BASE_URL + "users/store", data);
    return res.data;
}

export const adminHome = async () => {
    const res = await axios.get(BASE_URL + "admin/home", {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return res.data;
}