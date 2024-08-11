import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api/axios';
import { AuthContext } from './AuthContext';

const LogInSignUp = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);
    const navigate = useNavigate();

    const checkUsernameAvailability = async (username) => {
        try {
            const response = await axiosInstance.get(`check-username/${username}/`);
            setUsernameTaken(response.data.taken);
        } catch (error) {
            console.error('Error checking username availability', error);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        // Still need to improve logic for password strength
        if (value.length < 6) {
            setPasswordStrength('Youngling');
        } else if (value.length < 10) {
            setPasswordStrength('Padawan');
        } else {
            setPasswordStrength('Master');
        }
    };const handleLogin = async () => {
        try {
            await login(username, password);
            navigate('/profilepage');
        } catch (error) {
            console.error("I'm an authenticator droid, Jedi mind tricks don't work on me, only credentials!", error);
        }
    };

    const handleSignUp = async () => {
        if (usernameTaken) {
            alert("That's a name I've heard before, but it's not yours. Try again.");
            return;
        }
        try {
            await axiosInstance.post('createaccount/', { username, email, password });
            navigate('/accountinfo');
        } catch (error) {
            console.error('Sign up failed', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    checkUsernameAvailability(e.target.value);
                }}
                placeholder="Username"
            />
            {usernameTaken && <p>That's a name I've heard before, but it's not yours. Try again.</p>}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
            />
            <button onClick={handleLogin}>Log In</button>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default LogInSignUp;