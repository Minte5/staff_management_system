import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    expected_start_date: '',
    expected_end_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);
      
      const response = await axios.post('http://0.0.0.0:8888/project/', formData, {
        headers: {
          Authorization: `Token ${token.key}` 
        }
      });
      console.log('Project created successfully:', response.data);
      // Clear form data after successful submission
      setFormData({
        name: '',
        description: '',
        expected_start_date: '',
        expected_end_date: ''
      });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className='main'>
        <div className="recentOrders">
        <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>
        <div className="form-group">
          <label>Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Expected Start Date</label>
          <input
            type="date"
            name="expected_start_date"
            value={formData.expected_start_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Expected End Date</label>
          <input
            type="date"
            name="expected_end_date"
            value={formData.expected_end_date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
        </div>
    </div>
    
  );
};

export default CreateProject;

