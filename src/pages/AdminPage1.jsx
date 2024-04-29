import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import withAuth from './withAuth'; // Import the withAuth HOC

const AdminPage = () => {
  const [users, setUsers] = useState(null); // Initialize users as null
  const [tokenExists, setTokenExists] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for editing
  const [id, setSearchId] = useState('');
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

  useEffect(() => {
    const storedTokenString = localStorage.getItem('token');
    if (!storedTokenString) {
      setTokenExists(false);
      return;
    }

    const token = JSON.parse(storedTokenString);
    console.log('Stored Token:', token);

    // Check if token has expired
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    if (token.expires && token.expires < currentTime) {
      // Token has expired, clear it from local storage and redirect to login page
      localStorage.removeItem('token');
      setTokenExists(false);
      return;
    }

    // Token is valid, don't fetch users initially
  }, []);

  const fetchUsers = async () => {
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);

      const response = await axios.get('http://0.0.0.0:8888/users/', {
        headers: {
          Authorization: `Token ${token.key}` 
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);
      // Send a request to your backend to delete the user
      await axios.delete(`http://0.0.0.0:8888/users/${userId}`, {
        headers: {
          Authorization: `Token ${token.key}` 
        }
      });
      
      // Update the users state to remove the deleted user
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user for editing
  };

  const handleEditSubmit = async (updatedUser) => {
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);
      // Send a request to your backend to update the user data
      await axios.put(`http://0.0.0.0:8888/users/${updatedUser.id}`, updatedUser, {
        headers: {
          Authorization: `Token ${token.key}` 
        }
      });
      
      // Update the users state with the updated user data
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setSelectedUser(null); // Reset selected user after submitting edits
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const handleSearch = async () => {
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);

      const response = await axios.get(`http://0.0.0.0:8888/users/${id}`, {
        headers: {
          Authorization: `Token ${token.key}` 
        }
      });
      setUsers(response.data ? [response.data] : []); // If user found, set it as the only user, otherwise set an empty array
      console.log(id);
    } catch (error) {
      console.error('Error searching user:', error);
      setUsers([]); // If error occurred, set users to empty array
    }
  };


  const handleMenuItemClick = async () => {
    await fetchUsers();
  };
  

 

  const handleDeleteClick = async () => {
    await fetchUsers();
  };

  if (!tokenExists) {
    return <Navigate to="/" />;
  }





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
    














  };


  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <ul>
          <li onClick={handleMenuItemClick} className="dropdown"><a><span className='title'>List Users</span></a></li>
            {/*<ul className="dropdown-menu">*/}
              {/* Dropdown menu items */}
          <div className='sub-menu'>
            <li onClick={handleMenuItemClick} className='sub-menu'><a href="#">Submenu Item 1</a></li>
            <li onClick={handleMenuItemClick} className='sub-menu'><a href="#">Submenu Item 2</a></li>
            <li onClick={handleMenuItemClick} ><a href="#">Submenu Item 3</a></li>
          </div>
              
            {/*</ul>*/}
          
          <li onClick={handleMenuItemClick}><a><span className='title'>Menu Item 1</span></a></li>
          <li onClick={handleMenuItemClick}><a><span className='title'>Menu Item 1</span></a></li>
          
        </ul>
      </div>

    <div className='main'>
      <div className='content'>


        {/*<h2>Admin Panel</h2>
        <p>Welcome to the Admin Panel. You have access to administrative features.</p>*/}

        <div className="recentOrders">

          {users !== null && (
            <div className="search-area">
              <input
                type="text"
                value={id}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Search user ID"
              />
              <button onClick={handleSearch}>Search</button>
           
              <table>
                <thead>
                  <tr>
                    
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Gender</th>
                    <th>Office</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.gender}</td>
                      <td>{user.office}</td>
                      <td>{user.role}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td><button onClick={handleEditClick} className='btn1'><span className="edit">Edit</span></button><button onClick={() => deleteUser(user.id)} className='btn2'><span className="delete">Delete</span></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Render edit form if a user is selected */}
        {selectedUser && (
          <div className="edit-form">
            <h3>Edit User</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(selectedUser); }}>
              {/* Input fields for editing user data */}
              <input type="text" value={selectedUser.first_name} onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })} />
              <input type="text" value={selectedUser.last_name} onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })} />
              {/* Add more input fields for other user properties */}
              <button type="submit">Save</button>
              <button onClick={() => setSelectedUser(null)}>Cancel</button>
            </form>
          </div>
        )}


        {/*CREATING USER*/}

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

export default withAuth(AdminPage); // Wrap AdminPage with withAuth HOC
