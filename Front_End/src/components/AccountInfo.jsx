import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api/axios';
import "./AccountInfo.css"

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
  //increase progress counter
  const handleNext = () => {
      setStep(step + 1);
  };

  const handleSkip = () => {
      setStep(step + 1);
  };

  const handleComplete = async () => {
      try {
          // Create user account and profile
          const userResponse = await axiosInstance.post('user/sign_up/', {
            email,
            password,
            username,
            alignment: alignment, bio,
          });

          console.log("User and profile created:", userResponse.data);
          navigate('/loginsignup/');
      } catch (error) {
          console.error('Profile update failed', error);
          
          if (error.response && error.response.data) {
            console.error('Error data:', error.response.data);
        } else {
            console.error('Error response:', error.response);
        }
      }
  };


  const renderStep = () => {
    switch (step) {
      case 1:
      return (
        <div className="background7">
        <div className="step-container">
          <h2 className="step-title">Step 1: Enter Email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="step-input"
          />
          <div className="button-container">
            <button onClick={handleNext} className="step-button">Next</button>
            <button onClick={() => navigate('/loginsignup')} className="step-button">Cancel</button>
          </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="background7">
        <div className="step-container">
          <h2 className="step-title">Step 2: Enter Password</h2>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="step-input"
          />
          <p className="password-strength">Password strength: {passwordStrength}</p>
          <div className="button-container">
            <button onClick={handleNext} className="step-button">Next</button>
            <button onClick={() => navigate('/loginsignup')} className="step-button">Cancel</button>
          </div>
        </div>
        </div>
      );
    case 3:
      return (
        <div className="background7">
        <div className="step-container">
          <h2 className="step-title">Step 3: Select Username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="step-input"
          />
          {usernameTaken && <p className="username-taken">That's a name I've heard before, but it's not yours. Try again.</p>}
          <div className="button-container">
            <button onClick={handleNext} className="step-button">Next</button>
            <button onClick={handleSkip} className="step-button">Skip</button>
            <button onClick={() => navigate('/loginsignup')} className="step-button">Cancel</button>
          </div>
        </div>
        </div>
      );
    case 4:
      return (
        <div className="background7">
        <div className="step-container">
          <h2 className="step-title">Step 4: Select Organization Alignment</h2>
          <select value={alignment} onChange={(e) => setAlignment(e.target.value)} className="step-select">
            <option value="">Select Organization</option>
            {organizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
          <div className="button-container">
            <button onClick={handleNext} className="step-button">Next</button>
            <button onClick={handleSkip} className="step-button">Skip</button>
            <button onClick={() => navigate('/loginsignup')} className="step-button">Cancel</button>
          </div>
        </div>
        </div>
      );
    case 5:
      return (
        <div className="background7">
          <div className="step-container">
          <h2 className="step-title">Step 5: Enter Bio</h2>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            className="step-textarea"
          />
          <p className="redirect-message">You will be redirected to the login page after sign up to log in.</p>
          <div className="button-container">
            <button onClick={handleComplete} className="step-button">Complete</button>
            <button onClick={() => navigate('/loginsignup')} className="step-button">Cancel</button>
          </div>
        </div>
        </div>
      );
    default:
      return null;
  }
};

return (
  <div className="progress-container">
    {renderStep()}
    <div className="progress-info">
      <p>Progress: {step}/5 steps complete</p>
      <progress value={step} max="5" className="progress-bar"></progress>
    </div>
  </div>
 );
};
    
export default AccountInfo;