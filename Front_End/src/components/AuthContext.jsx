import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from './api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axiosInstance.defaults.headers['Authorization'] = `Token ${token}`;
            setAuth({ token });
        }
    }, []);

    const login = async (username, password) => {
        const response = await axiosInstance.post('login/', { username, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers['Authorization'] = `Token ${token}`;
        setAuth({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers['Authorization'];
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };