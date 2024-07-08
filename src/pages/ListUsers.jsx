import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { useNavigate, Link } from 'react-router-dom';

const ListUsers = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null); // Add this state
  const [id, setSearchId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);
      await axios.delete(`http://0.0.0.0:8888/users/${userId}/`, {
        headers: {
          Authorization: `Token ${token.key}`
        }
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditClick = (user) => {
    setOriginalUser(user); // Store the original user data
    setSelectedUser({ ...user }); // Create a copy for editing
  };

  const handleEditSubmit = async (updatedUser) => {
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);
  
      const modifiedFields = {};
      Object.keys(updatedUser).forEach((key) => {
        if (updatedUser[key] !== originalUser[key]) {
          modifiedFields[key] = updatedUser[key];
        }
      });
  
      console.log('Modified Fields:', modifiedFields); // Log modified fields for debugging
  
      await axios.patch(`http://0.0.0.0:8888/users/${updatedUser.id}/`, modifiedFields, {
        headers: {
          Authorization: `Token ${token.key}`
        }
      });
  
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setSelectedUser(null);
      setOriginalUser(null); // Reset original user after submitting edits
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);

      const response = await axios.get(`http://0.0.0.0:8888/users/${id}`, {
        headers: {
          Authorization: `Token ${token.key}`
        }
      });
      setUsers(response.data ? [response.data] : []);
    } catch (error) {
      console.error('Error searching user:', error);
      setUsers([]);
    }
  };

  return (
    <div className='container mt-4'>
      {selectedUser && (
        <div className='row mt-4'>
          <div className='col'>
            <div className='card shadow-sm'>
              <div className='card-body'>
                <h3 className='card-title'>Edit User</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(selectedUser); }}>
                  <div className='mb-3'>
                    <label htmlFor='username' className='form-label'>User Name</label>
                    <input
                      type='text'
                      id='username'
                      value={selectedUser.username}
                      onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='firstName' className='form-label'>First Name</label>
                    <input
                      type='text'
                      id='firstName'
                      value={selectedUser.first_name}
                      onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='lastName' className='form-label'>Last Name</label>
                    <input
                      type='text'
                      id='lastName'
                      value={selectedUser.last_name}
                      onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
                      className='form-control'
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor='gender' className='form-label'>Gender</label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={selectedUser.gender}
                        onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                  </div>

                  <div className="row mb-3">
                    <div className="col">
                      <div className="form-floating">
                        <select
                          className="form-select"
                          id="work_role"
                          name="work_role"
                          value={selectedUser.roles && selectedUser.roles[0] ? selectedUser.roles[0].work_role : ''}
                          onChange={(e) => {
                            const updatedRoles = selectedUser.roles ? [...selectedUser.roles] : [{}];
                            updatedRoles[0] = { ...updatedRoles[0], work_role: e.target.value };
                            setSelectedUser({ ...selectedUser, roles: updatedRoles });
                          }}
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
                          id="office"
                          name="office"
                          value={selectedUser.roles && selectedUser.roles[0] ? selectedUser.roles[0].office : ''}
                          onChange={(e) => {
                            const updatedRoles = selectedUser.roles ? [...selectedUser.roles] : [{}];
                            updatedRoles[0] = { ...updatedRoles[0], office: e.target.value };
                            setSelectedUser({ ...selectedUser, roles: updatedRoles });
                          }}
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
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='phone' className='form-label'>Phone</label>
                    <input
                      type='text'
                      id='phone'
                      value={selectedUser.phone}
                      onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input
                      type='email'
                      id='email'
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                      className='form-control'
                    />
                  </div>
                  <button type='submit' className='btn btn-success'>Save</button>
                  <button onClick={() => setSelectedUser(null)} className='btn btn-secondary ms-2'>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='row'>
        <div className='col'>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <h1 className='display-6 mb-4'>Users</h1>
              <form className='row g-2 mb-4' role='search' onSubmit={handleSearch}>
                <div className='col-md-10'>
                  <input
                    type='text'
                    value={id}
                    onChange={(e) => setSearchId(e.target.value)}
                    className='form-control'
                    placeholder='Search user ID'
                  />
                </div>
                <div className='col-md-2'>
                  <button className='btn btn-success btn-sm w-100' type='submit'>Search</button>
                </div>
              </form>
              {users !== null && (
                <div>
                  <button
                    onClick={() => navigate('/admin/*/create-user')}
                    className='btn btn-primary mt-3'
                  >
                    Add User +
                  </button>
                  <table className='table table-hover'>
                    <thead className='table-dark'>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
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
                          <td>{user.roles && user.roles[0] ? user.roles[0].office : 'N/A'}</td>
                          <td>{user.roles && user.roles[0] ? user.roles[0].role : 'N/A'}</td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td className='d-flex'>
                            <button
                              onClick={() => handleEditClick(user)}
                              className='btn btn-outline-success btn-sm me-2'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className='btn btn-outline-danger btn-sm'
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ListUsers;
