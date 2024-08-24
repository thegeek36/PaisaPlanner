// src/axiosInstance.js
import axios from 'axios';
import { toast } from 'react-toastify';
 
const axiosInstance = axios.create({
    baseURL: 'https://paisaplanner-1.onrender.com/api/',
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token has expired or is invalid
            localStorage.removeItem('token'); // Clear the token from local storage
            window.location.href = '/login'; // Redirect to the login page
            toast.error('Session expired. Please log in again.');
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
