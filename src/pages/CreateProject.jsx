import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css';
import {  useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    expected_start_date: '',
    expected_end_date: ''
  });
  const navigate = useNavigate();

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
      
      
      setFormData({
        name: '',
        description: '',
        expected_start_date: '',
        expected_end_date: ''
      });
      window.alert('Task created successfully!');
      navigate('/admin/*/list-projects');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card project-card shadow rounded">
            <div className="card-body">
              <h2 className="mb-4 text-center">Create Project</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                  <label htmlFor="name">Project Name</label>
                </div>
                <div className="mb-3 form-floating">
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <label htmlFor="description">Project Description</label>
                </div>
                <div className="mb-3 form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="expected_start_date"
                    name="expected_start_date"
                    value={formData.expected_start_date}
                    onChange={handleChange}
                  />
                  <label htmlFor="expected_start_date">Expected Start Date</label>
                </div>
                <div className="mb-3 form-floating">
                  <input
                    type="date"
                    className="form-control"
                    id="expected_end_date"
                    name="expected_end_date"
                    value={formData.expected_end_date}
                    onChange={handleChange}
                  />
                  <label htmlFor="expected_end_date">Expected End Date</label>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;

