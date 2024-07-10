import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';

const CreateSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    office: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'office' ? parseInt(value, 10) : value
    }));
  };
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);
      
      const response = await axios.post('http://0.0.0.0:8888/sections/', formData, {
        headers: {
          Authorization: `Token ${token.key}` 
        }
      });
      console.log('Section created successfully:', response.data);
      
      setFormData({
        name: '',
        office: ''
      });
      alert('Section created successfully');
      navigate('/admin/*/list-sections');
    } catch (error) {
      console.error('Error creating section:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card section-card shadow rounded">
            <div className="card-body">
              <h2 className="mb-4 text-center">Create Section</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={150}
                    minLength={1}
                    required
                  />
                  <label htmlFor="name">Section Name</label>
                </div>
                <div className="mb-3 form-floating">
                  <select
                    className="form-control"
                    id="office"
                    name="office"
                    value={formData.office}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Office</option>
                    <option value="1">HOD</option>
                    <option value="2">Under Graduate</option>
                    <option value="3">Post Graduate</option>
                    <option value="4">Developer</option>
                  </select>
                  <label htmlFor="office">Office</label>
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

export default CreateSection;
