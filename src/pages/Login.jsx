import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [lockoutMessage, setLockoutMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedAttemptCount = localStorage.getItem('attemptCount');
    const storedLockoutTime = localStorage.getItem('lockoutTime');
    if (storedAttemptCount) setAttemptCount(parseInt(storedAttemptCount, 10));
    if (storedLockoutTime) setLockoutTime(new Date(storedLockoutTime));
  }, []);

  useEffect(() => {
    localStorage.setItem('attemptCount', attemptCount);
    if (lockoutTime) {
      localStorage.setItem('lockoutTime', lockoutTime);
    } else {
      localStorage.removeItem('lockoutTime');
    }

    if (lockoutTime) {
      const interval = setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= lockoutTime) {
          setLockoutMessage('');
          setLockoutTime(null);
          setAttemptCount(0); // Reset the attempt count after the lockout period
        } else {
          const remainingTime = lockoutTime - currentTime;
          const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
          const seconds = Math.floor((remainingTime / 1000) % 60);
          setLockoutMessage(`Try again in ${minutes} minutes and ${seconds} seconds.`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTime]);

  const handleSubmit = async () => {
    const currentTime = new Date();
    if (lockoutTime && currentTime < lockoutTime) {
      setLoginError(true);
      return;
    }

    try {
      const response = await axios.post('http://0.0.0.0:8888/auth/login/', {
        'username': username,
        'password': password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const { roles, role, token, office } = response.data;
        console.log('Stored data:', response.data);

        const tokenString = JSON.stringify(token);
        localStorage.setItem('token', tokenString);
        console.log('Stored Token:', token);

        if (roles[0].office === 'HOD' || roles[0].office === 'DEVELOPER') {
          navigate('/admin/*/users');
        }
        else if (roles[0].office === 'Post Graduate') {
          if (roles[0].role === 'Coordinator') {
            navigate('/coord/*/users');
          }
          else if (roles[0].role === 'Staff') {
            navigate('/staff/*/list-projects');
          }
          else {
            setLoginError(true);
          }
        }
        else if (roles[0].office === 'Technical Assistance') {
          if (roles[0].role === 'Coordinator') {
            navigate('/coord/*/users');
          }
          else if (roles[0].role === 'Staff') {
            navigate('/staff/*/list-projects');
          }
          else {
            setLoginError(true);
          }
        }
        else if (roles[0].office === 'Under Graduate') {
          if (roles[0].role === 'Head') {
            navigate('/admin/*/users');
          }
          else if (roles[0].role === 'Staff') {
            navigate('/staff/*/list-projects');
          }
          else {
            setLoginError(true);
          }
        }
        setLoginError(false);
        setAttemptCount(0);
        setLockoutTime(null);
      } else {
        handleLoginFailure();
      }
    } catch (error) {
      console.error('Error during login:', error);
      handleLoginFailure();
    }
  };

  const handleLoginFailure = () => {
    setLoginError(true);
    setAttemptCount((prevCount) => prevCount + 1);

    if (attemptCount >= 2) {
      const currentTime = new Date();
      if (attemptCount >= 4) {
        const lockoutUntil = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour
        setLockoutTime(lockoutUntil);
      } else {
        const lockoutUntil = new Date(currentTime.getTime() + 3 * 60 * 1000); // 3 minutes
        setLockoutTime(lockoutUntil);
      }
    }
  };

  return (
    <div className='lo'>
      <div className='wrapper'>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <h2>Login</h2>
          <div className='input-box'>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type='name' id="username" placeholder='UserName' required />
          </div>
          <div className='input-box'>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' id="password" placeholder='Password' required />
          </div>
          {loginError && (
            <p className="error-message" style={{ color: 'red' }}>
              {lockoutTime
                ? `Wrong username or password. ${lockoutMessage}`
                : `Wrong username or password. You have ${3 - attemptCount} ${3 - attemptCount === 1 ? 'trial' : 'trials'} left.`}
            </p>
          )}
          <div className="remember-forgot">
            <label><input type='checkbox' />Remember me </label>
            <a href='/forgot-password'> Forgot password</a>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
