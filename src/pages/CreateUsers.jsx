import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';


const CreateUsers = () => {

    
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        office: "",
        role: "",
        password: "",
        confirm_password: "",
        gender: "",
        is_active: false,
      });
      const [errors, setErrors] = useState({});
    // CREATING USER

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    const validationErrors = {};
    
    // Validate username
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9@.+_-]{1,150}$/.test(formData.username.trim())) {
      validationErrors.username = 'Username must be 150 characters or fewer and contain only letters, digits, and @/./+/-/_';
    }

    // Validate email
    if (!formData.email.trim()) {
      validationErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      validationErrors.email = 'Invalid email address';
    }
    // Validate password
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.trim() !== formData.confirm_password.trim()) {
      validationErrors.confirm_password = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log('Form Data:', formData);
    // Submit form data if validation passed
    try {
      console.log('Form Data:', formData);
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);
      
    
      await axios.post(`http://0.0.0.0:8888/users/`, formData, {
        headers: {
          
          Authorization: `Token ${token.key}` 
        }
      });
      
      console.log('Error fetching users:');
      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        office: "",
        role: "",
        password: "",
        confirm_password: "",
        gender: "",
        is_active: false,
      });
      setErrors({});
      alert('User created successfully');
    } catch (error) {
      
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
      
    }
}


  
    return(

        
        <div className='main'>
            <div className="recentOrders">
            <div className='content'>
                <div className="create-user-form">
                    <h2>Create User</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            {errors.username && <span className="error">{errors.username}</span>}
                            </div>
                            <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            </div>
                            <div className="form-group">
                            <label>Office</label>
                            <select
                                name="office"
                                value={formData.office}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="HOD">HOD</option>
                                <option value="UG">UG</option>
                                <option value="PG">PG</option>
                                <option value="TA">TA</option>
                            </select>
                            </div>
                            <div className="form-group">
                            <label>Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="Administrator">Administrator</option>
                                <option value="Coordinator">Coordinator</option>
                                <option value="Staff">Staff</option>
                            </select>
                            </div>
                            <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                            <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                            />
                            {errors.confirm_password && <span className="error">{errors.confirm_password}</span>}
                            </div>
                            <div className="form-group">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            </div>
                            <div className="form-group">
                            <label>Active:</label>
                            <input 
                                type="checkbox" 
                                name="isActive" 
                                checked={formData.is_active}
                                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            </div>
            
            
        </div>
        
                

        
    );
};


export default CreateUsers;