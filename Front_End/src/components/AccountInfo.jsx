import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api/axios';

const AccountInfo = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [username, setUsername] = useState('');
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [alignment, setAlignment] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate();

    const organizations = [
        'Jedi Order',
        'Sith Order',
        'Galactic Empire',
        'Rebel Alliance',
        'Mandalorians',
        'Bounty Hunters Guild',
        'Trade Federation',
        'Separatists',
        'New Republic',
        'First Order'
    ];

    const checkUsernameAvailability = async (username) => {
        try {
            const response = await axiosInstance.get(`user/check-username/${username}/`, { timeout: 5000 });
            setUsernameTaken(response.data.taken);
        } catch (error) {
            console.error('Error checking username availability', error);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        // Still need to improve password strength logic
        if (value.length < 6) {
            setPasswordStrength('Youngling');
        } else if (value.length < 12) {
            setPasswordStrength('Padawan');
        } else {
            setPasswordStrength('Master');
        }
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleSkip = () => {
        setStep(step + 1);
    };

    const handleComplete = async () => {
        try {
            const response = await axiosInstance.post('profile/profiles/', {
                email,
                username,
                organization_alignment: alignment,
                bio,
            });
            console.log("Profile created:", response.data);
        navigate('/profilepage');
        } catch (error) {
            console.error('Profile update failed', error);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h2>Step 1: Enter Email</h2>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <button onClick={handleNext}>Next</button>
                        <button onClick={() => navigate('/loginsignup')}>Cancel</button>
                    </div>
                );
                case 2:
                    return (
                        <div>
                            <h2>Step 2: Enter Password</h2>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Password"
                            />
                            <p>Password strength: {passwordStrength}</p>
                            <button onClick={handleNext}>Next</button>
                            <button onClick={() => navigate('/loginsignup')}>Cancel</button>
                        </div>
                    );
                case 3:
                    return (
                        <div>
                            <h2>Step 3: Select Username</h2>
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
                            <button onClick={handleNext}>Next</button>
                            <button onClick={handleSkip}>Skip</button>
                            <button onClick={() => navigate('/loginsignup')}>Cancel</button>
                        </div>
                    );
                case 4:
                    return (
                        <div>
                            <h2>Step 4: Select Organization Alignment</h2>
                            <select value={alignment} onChange={(e) => setAlignment(e.target.value)}>
                                <option value="">Select Organization</option>
                                {organizations.map((org) => (
                                    <option key={org} value={org}>
                                        {org}
                                    </option>
                                ))}
                            </select>
                            <button onClick={handleNext}>Next</button>
                            <button onClick={handleSkip}>Skip</button>
                            <button onClick={() => navigate('/loginsignup')}>Cancel</button>
                        </div>
                    );
                case 5:
                    return (
                        <div>
                            <h2>Step 5: Enter Bio</h2>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Bio"
                            />
                            <button onClick={handleComplete}>Complete</button>
                            <button onClick={handleSkip}>Skip</button>
                            <button onClick={() => navigate('/loginsignup')}>Cancel</button>
                        </div>
                    );
                default:
                    return null;
            }
        };
    
        return (
            <div>
                {renderStep()}
                <div>
                    <p>Progress: {step}/5 steps complete</p>
                    <progress value={step} max="5"></progress>
                </div>
            </div>
        );
    };
    
    export default AccountInfo;