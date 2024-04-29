// ForgotPasswordConfirm.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Login.css';


const ForgotPasswordConfirm = () => {
  
  const [password, setNewPassword] = useState('');
  const [token, setToken] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleResetPassword = async () => {
    try {
      await axios.post('http://0.0.0.0:8888/auth/password_reset/confirm/', {    
        password,
        token,
      });
      setPasswordChanged(true);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };




  
  return (
    <div className='lo'>
        <div className='wrapper'>
            <h2>Reset Password</h2>
            {!passwordChanged ? (
                <form>
                    <div className='input-box'> 
                        <input type="password" value={password} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' required/> 
                    </div>

                    <div className='input-box'> 
                        <input type="string" value={token} onChange={(e) => setToken(e.target.value)} placeholder='Token' required/>
                    </div>
                
                    <button type="button" onClick={handleResetPassword}>
                        Reset Password
                    </button>
                </form>
            ) : (
                
                <div>
                    <p>Your password has been successfully changed. You can now log in with your new password.</p>
                    <a href='/'> Login Page</a>
                </div>
            )}
        </div>

    </div>

  );
};

export default ForgotPasswordConfirm;

