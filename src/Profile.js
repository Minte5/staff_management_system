import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '/home/mints/Downloads/staff_management_system/src/pages/AdminPage.css';

const Profile = () => {
    const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                const response = await axios.get('http://0.0.0.0:8888/api/profile/', {
                    headers: {
                        'Authorization': `Token ${token.key}`
                    }
                });

                setProfile(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.put('http://0.0.0.0:8888/api/profile/', profile, {
                headers: {
                    'Authorization': `Token ${token.key}`,
                    'Content-Type': 'application/json'
                }
            });

            setProfile(response.data);
            alert('Profile updated successfully');
        } catch (err) {
            setError(err);
            alert('Failed to update profile');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading profile: {error.message}</p>;

    return (
        
        
        <div className='main'>
            <div className="recentOrders">
                <h1>Profile</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {/* Add more fields as needed */}
                    <button type="submit">Update Profile</button>
                </form>
            </div>
            
        </div>
    );
};

export default Profile;
