import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { useNavigate, Link  } from 'react-router-dom';

const ListUsers = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user for editing
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

    fetchUsers(); // Call the fetchUsers function
  }, []);

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

  return (
    <div className='main'>
      <div className="recentOrders">
      
      {users !== null && (
        <div>
        <form className="d-flex" role='search'>
          <input
            type="text"
            value={id}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Search user ID"
          />
          <button className="btn btn-success" onClick={handleSearch}>Search</button>
          {/* <button>Search</button> */}
          </form>
          <table className='table'>
            <thead>
              <tr className='table-dark'>
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
                  <td>
                    <button onClick={() => handleEditClick(user)} className='btn btn-success'>
                      Edit
                    </button>
                    <button onClick={() => deleteUser(user.id)} className='btn btn-danger'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => navigate('/admin/*/create-user')} className="btn btn-primary">
              Add User +
          </button>
        </div>
      )}

      {selectedUser && (
        <div className="edit-form">
          <h3>Edit User</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(selectedUser); }}>
            {/* Input fields for editing user data */}
            <input type="text" value={selectedUser.first_name} onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })} />
            <input type="text" value={selectedUser.last_name} onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })} />
            <input type="text" value={selectedUser.phone} onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })} />
            <input type="email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
            
            <button type="submit">Save</button>
            <button onClick={() => setSelectedUser(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default ListUsers;
