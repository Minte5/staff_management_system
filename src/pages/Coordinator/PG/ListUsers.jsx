import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { useNavigate, Link  } from 'react-router-dom';

const ListUsers = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); 
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
      
      await axios.delete(`http://0.0.0.0:8888/users/${userId}`, {
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
    setSelectedUser(user); 
  };
  
  const handleEditSubmit = async (updatedUser) => {
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);
      
      await axios.patch(`http://0.0.0.0:8888/users/${updatedUser.id}/`, updatedUser, {
        headers: {
          Authorization: `Token ${token.key}` 
        }
      });
      
      
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      setSelectedUser(null); 
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
      setUsers(response.data ? [response.data] : []); 
      console.log(id);
    } catch (error) {
      console.error('Error searching user:', error);
      setUsers([]); 
    }
  };

  return (
    <div className='container mt-4'>
      <h1 className='display-6 mb-4'><b>Coordinators Dashboard</b></h1>
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
                        
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.gender}</td>
                          <td>{user.roles && user.roles[0] ? user.roles[0].office : 'N/A'}</td>
                          <td>
                            
                            {user.roles && user.roles[0] ? user.roles[0].role : 'N/A'}
                            
                          </td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td className='d-flex'>
                            
                            
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
      {selectedUser && (
        <div className='row mt-4'>
          <div className='col'>
            <div className='card shadow-sm'>
              <div className='card-body'>
                <h3 className='card-title'>Edit User</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(selectedUser); }}>
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
    </div>
  );
};

export default ListUsers;
