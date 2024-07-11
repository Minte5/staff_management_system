import React, { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SetNewPassword = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  console.log("searchparam", searchParams);

  const token = searchParams?.get("token");
  const uidb64 = searchParams?.get("uidb64");

  console.log("token", token);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.put(`http://0.0.0.0:8888/auth/set_password/?uidb64=${uidb64}&token=${token}`, { password, confirmPassword });

      if (response.status === 200) {
        setMessage('Password reset successfully.');
        setTimeout(() => {
            navigate('/', { replace: true });
        }, 2000);
      } else {
        setMessage(response.data.message || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleChangePassword}>
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" onClick={handleChangePassword}>Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SetNewPassword;
