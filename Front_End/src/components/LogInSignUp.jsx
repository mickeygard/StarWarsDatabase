import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api/axios';
import { AuthContext } from './AuthContext';

const LogInSignUp = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(username, password);
            navigate('/profilepage');
        } catch (error) {
            console.error("I'm an authenticator droid, Jedi mind tricks don't work on me, only credentials!", error);
        }
    };

    const handleSignUp = () => {
        navigate('/accountinfo');
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Log In</button>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default LogInSignUp;