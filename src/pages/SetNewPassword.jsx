import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const SetNewPassword = () => {
  const { token } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('/api/reset-password', { token, password });

      if (response.status === 200) {
        setMessage('Password reset successfully.');
        setTimeout(() => {
          history.push('/login'); // Redirect to login page after success
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
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SetNewPassword;
