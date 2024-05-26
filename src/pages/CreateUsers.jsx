import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';


const CreateUsers = () => {

    
    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        office: "",
        role: "",
        // password: "",
        // confirm_password: "",
        gender: "",
        is_active: false,
      });
      const [errors, setErrors] = useState({});
      const navigate = useNavigate();
    // CREATING USER

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const [roles, setRoles] = useState([]);

  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'office') {
      setFormData({ ...formData, [name]: value });
      // Update roles based on selected office
      if (value === 'HOD') {
        setRoles(['Administrator']);
      } else {
        setRoles(['Staff', 'Coordinator']);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
    // if (!formData.password.trim()) {
    //   validationErrors.password = 'Password is required';
    // } else if (formData.password.trim() !== formData.confirm_password.trim()) {
    //   validationErrors.confirm_password = 'Passwords do not match';
    // }

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
        // password: "",
        // confirm_password: "",
        gender: "",
        is_active: false,
      });
      setErrors({});
      alert('User created successfully');
      navigate('/admin/*/list-users');
    } catch (error) {
      
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
      
    }
}


  
return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm r-4">
          <div className="card-body">
            <h2 className="mb-4 text-center">Create User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                    />
                    <label htmlFor="first_name">First Name</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                    />
                    <label htmlFor="last_name">Last Name</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email Address</label>
                {errors.email && <span className="text-danger">{errors.email}</span>}
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label htmlFor="phone">Phone</label>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="office"
                      name="office"
                      value={formData.office}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="UG">UG</option>
                      <option value="PG">PG</option>
                      <option value="TA">TA</option>
                    </select>
                    <label htmlFor="office">Office</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={!formData.office}
                    >
                      <option value="">Select</option>
                      <option value="Staff">Staff</option>
                      <option value="Coordinator">Coordinator</option>
                    </select>
                    <label htmlFor="role">Role</label>
                  </div>
                </div>
              </div>
              <div className="mb-3 form-floating">
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label htmlFor="gender">Gender</label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="is_active">Active</label>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


export default CreateUsers;