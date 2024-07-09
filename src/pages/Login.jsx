import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
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
        const { roles, role, token ,office} = response.data;
        console.log('Stored data:', response.data);
        
       
        const tokenString = JSON.stringify(token);

        
        localStorage.setItem('token', tokenString);
        console.log('Stored Token:', token);

       

        if (roles[0].office === 'HOD' || roles[0].office === 'DEVELOPER') {
          navigate('/admin/*/users');
        } 
        else if (roles[0].office === 'Post Graduate') {
          if(roles[0].role === 'Coordinator'){
            navigate('/coord/*/users');
          }
          else if(roles[0].role === 'Staff'){
            navigate('/staff/*/list-projects');
          }
         
          else {
            setLoginError(true);
          }
          
        } 
        else if (roles[0].office === 'Technical Assistance') {
          if(roles[0].role === 'Coordinator'){
            navigate('/coord/*/users');
          }
          else if(roles[0].role === 'Staff'){
            navigate('/staff/*/list-projects');
          }
         
          else {
            setLoginError(true);
          }
          
        } 
        else if (roles[0].office === 'Under Graduate') {
          if(roles[0].role === 'Head'){
            navigate('/admin/*/users');
          }
          else if(roles[0].role === 'Staff'){
            navigate('/staff/*/list-projects');
          }
          
          else {
            setLoginError(true);
          }
          
        }
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLoginError(true);
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
          {loginError && <p className="error-message">Wrong username or password. Please try again.</p>}
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