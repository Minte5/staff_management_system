import { Component } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Logging out...');
        //const token = localStorage.getItem('token'); // Retrieve token from local storage
        const storedTokenString = localStorage.getItem('token');

        // Parse the token string back into a JavaScript object
        const token = JSON.parse(storedTokenString);
        //const storedToken = localStorage.getItem('token');
        //const token = JSON.parse(storedToken);
        console.log('Stored Token:', token);

        axios.post('http://0.0.0.0:8888/auth/logout/', null, {
            withCredentials: true, // Include credentials
            headers: {
                'Authorization': `Token ${token.key}` // Include token in Authorization header
            }
        })
        .then(response => {
            console.log('Logout response:', response);
            if (response.status === 200) {
                // Handle successful logout
                localStorage.removeItem('token'); // Remove token from local storage
                navigate('/'); // Redirect to login page
            } else {
                // Handle error
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
        });
    };
    const handleProfile = () => {
        navigate('/admin/*/profile');
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