import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';
{/*import { FaUser,FaLock} from "react-icons/fa";*/}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const navigate = useNavigate();

  /*const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }*/



  const handleSubmit = async () => {
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { role } = await response.json();

      
      if (role === 'admin') {
        navigate.push('/admin');
      } else if(role === 'user1'){
        navigate.push('/user1');
      } else if(role === 'user2') {
        navigate.push('/user2')
      }
    } else {
      
      console.error('Login failed');
    }
  };












  return (
    <div className='wrapper'>
      
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            
            <div className='input-box'>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required />
                {/*<FaUser className='icon' />*/}
            </div>

            <div className='input-box'>
                <input value={password} onChange={(e) => setPass(e.target.value)} type='password' placeholder='Password' required />
                {/*<FaLock className='icon' />*/}
            </div>

            <div className="remember-forgot">
              <label><input type='checkbox'/>Remember me </label>
              <a href='#'> Forgot password</a>
            </div>

            <button type='submit'>Login</button>

            {/*<div className='register-link'>
              <p>Don't have an account? <a onClick={() => props.onFormSwitch('register')} href='#'>Register</a></p>
  </div>*/}
        </form>
        
    </div>
  )
}

export default Login
