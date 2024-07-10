import { Component } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logging out...');
        
        const storedTokenString = localStorage.getItem('token');

        
        const token = JSON.parse(storedTokenString);
        
        console.log('Stored Token:', token);

        axios.post('http://0.0.0.0:8888/auth/logout/', null, {
            withCredentials: true, 
            headers: {
                'Authorization': `Token ${token.key}` 
            }
        })
        .then(response => {
            console.log('Logout response:', response);
            if (response.status === 200) {
                
                localStorage.removeItem('token'); 
                navigate('/'); 
            } else {
                
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
    };
    const handleProfile = () => {
        navigate('/staff/*/profile');
    };

    return (
        <nav>
            <a href='#'><img src="/logo.png" className="App-logo" alt="logo" /></a>
            <div>
                <ul id='navbar1'>
                    <li><a className="active" href='index.html'>DEFENCE UNIVERSITY COLLEGE CIT DEPARTMENT</a></li>
                    {/*<li><a href='#'>About Us</a></li>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>Contact</a></li>
                     <li><a href='#'>Profile</a></li> */}
                </ul>
            </div>

            <div className="navbar-buttons">
                <button onClick={handleProfile} className='profile-button'>
                    <img src="/logo.png" alt="Profile" className="avatar" />
                </button>
                <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
            </div>

        </nav>
    );
};

export default Navbar;