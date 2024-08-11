import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api/axios';

const AccountInfo = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [affiliation, setAffiliation] = useState('');
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

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleSkip = () => {
        setStep(step + 1);
    };

    const handleComplete = async () => {
        try {
            await axiosInstance.post('profiles/', {
                email,
                username,
                organization_affiliation: affiliation,
                bio,
            });
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
                        <h2>Step 2: Select Username and Organization Affiliation</h2>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <select value={affiliation} onChange={(e) => setAffiliation(e.target.value)}>
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
            case 3:
                return (
                    <div>
                        <h2>Step 3: Enter Bio</h2>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Write about why you love Star Wars, create a character backstory, whatever you want!"
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
                <p>Progress: {step}/3 steps complete</p>
                <progress value={step} max="3"></progress>
            </div>
        </div>
    );
};

export default AccountInfo;