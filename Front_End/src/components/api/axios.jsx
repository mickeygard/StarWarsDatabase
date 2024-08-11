import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',  // Adjust the base URL as needed
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;