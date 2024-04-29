import React, { useState } from 'react';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return(
        <div className='wrapper'>
            <>
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>

                    <div className='input-box'>
                        <input value={name} onChange={(e) => setName(e.target.value)} type='name' placeholder='Full Name' required />
                        {/*<FaUser className='icon' />*/}
                    </div>

                    
                    <div className='input-box'>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required />
                        {/*<FaUser className='icon' />*/}
                    </div>

                    <div className='input-box'>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type='password' placeholder='Password' required />
                        {/*<FaLock className='icon' />*/}
                    </div>

                    <div className="remember-forgot">
                    <label><input type='checkbox'/>Remember me </label>
                    <a href='#'> Forgot password</a>
                    </div>

                    <button type='submit'>Register</button>

                    <div className='register-link'>
                    <p>Already have an account? <a onClick={() => props.onFormSwitch('login')} href='#'>Login</a></p>
                    </div>
                </form>
            </>  
        </div>

    )
}


























