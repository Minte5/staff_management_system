import React, { useState } from 'react';
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
    roles: [{ office: "", role: "",section: "", work_role: "" }],
    gender: "",
    is_active: false,
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    setFormData((prevFormData) => {
      if (name === "office" || name === "role" || name === "work_role") {
        const updatedRoles = [...prevFormData.roles];
        updatedRoles[0] = { ...updatedRoles[0], [name]: value };
        return { ...prevFormData, roles: updatedRoles };
      } else {
        return {
          ...prevFormData,
          [name]: type === 'checkbox' ? checked : value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = {};

    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    } else if (!/^[a-zA-Z0-9@.+_-]{1,150}$/.test(formData.username.trim())) {
      validationErrors.username = 'Username must be 150 characters or fewer and contain only letters, digits, and @/./+/-/_';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      validationErrors.email = 'Invalid email address';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Form Data:', formData);

    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);

      const response = await axios.post('http://0.0.0.0:8888/users/', formData, {
        headers: {
          Authorization: `Token ${token.key}`,
        },
      });

      console.log('Response:', response.data);

      setFormData({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        roles: [{ office: "", role: "",section: "", work_role: "" }],
        gender: "",
        is_active: false,
      });
      setErrors({});
      alert('User created successfully');
      navigate('/admin/*/users');
    } catch (error) {
      if (error.response) {
        console.error('Error creating user:', error.response.data);
        setErrors(error.response.data);
      } else {
        console.error('Error creating user:', error.message);
        alert('Failed to create user. Please try again.');
      }
    }
  };

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
                  {errors.username && <span className="text-danger">{errors.username}</span>}
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
                        value={formData.roles[0].office}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Under Graduate">Under Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                        <option value="Technical Assistance">Technical Assistance</option>
                        <option value="Developer">Developer</option>
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
                        value={formData.roles[0].role}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Staff">Staff</option>
                        <option value="Coordinator">Coordinator</option>
                        <option value="Head">Head</option>
                        <option value="Administrator">Administrator</option>
                      </select>
                      <label htmlFor="role">Role</label>
                    </div>
                  </div>
                </div>
                <div className="mb-3 form-floating">
                  <select
                    className="form-control"
                    id="section"
                    name="section"
                    value={formData.roles[0].section}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Office</option>
                    <option value="CSE">Computer Science and Engineering</option>
                    <option value="CE">Computer Engineering</option>
                    <option value="IT">Information Technology</option>
                    
                  </select>
                  <label htmlFor="office">Section</label>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <div className="form-floating">
                      <select
                        className="form-select"
                        id="work_role"
                        name="work_role"
                        value={formData.roles[0].work_role}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Assistant">Assistant</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Secretary">Secretary</option>
                      </select>
                      <label htmlFor="work_role">Work Role</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating">
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
                  </div>
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
