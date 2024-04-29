// ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      await axios.post('http://0.0.0.0:8888/auth/password_reset/', { email });

      setEmailSent(true);
    } catch (error) {
      console.error('Error sending reset password email:', error);
      setEmailError(true);
    }
  };

  return (
    <div className='lo'>
      <div className='wrapper'>
        <h2>Forgot Password</h2>
        {!emailSent ? (
          <form>
            <div className='input-box'>
              
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='EMAIL' required/>
              
            </div>

            {emailError && <p className="error-message">Wrong Email. Please try again.</p>}
            
            <button type="button" onClick={handleForgotPassword}>
              Send Reset Email
            </button>
          </form>
        ) : (
          <p>An email with instructions to reset your password has been sent to your email address.</p>
        )}
      </div>
    </div>
    
  );
};

export default ForgotPassword;
