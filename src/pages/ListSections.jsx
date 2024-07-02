import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';

const ListSections = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const storedTokenString = localStorage.getItem('token');
        const token = JSON.parse(storedTokenString);

        const response = await axios.get('http://0.0.0.0:8888/sections/', {
          headers: {
            Authorization: `Token ${token.key}`
          }
        });
        setSections(response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchSections();
  }, []);

  const deleteSection = async (sectionId) => {
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);

      await axios.delete(`http://0.0.0.0:8888/sections/${sectionId}`, {
        headers: {
          Authorization: `Token ${token.key}`
        }
      });

      setSections(sections.filter(section => section.id !== sectionId));
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const handleEditClick = (section) => {
    setSelectedSection(section);
  };

  const handleEditSubmit = async (updatedSection) => {
    try {
      const storedTokenString = localStorage.getItem('token');
      const token = JSON.parse(storedTokenString);

      await axios.patch(`http://0.0.0.0:8888/sections/${updatedSection.id}/`, updatedSection, {
        headers: {
          Authorization: `Token ${token.key}`
        }
      });

      setSections(sections.map(section => (section.id === updatedSection.id ? updatedSection : section)));
      setSelectedSection(null);
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col'>
          <div className='card shadow-sm'>
            <div className='card-body'>
              <h1 className='display-6 mb-4'>Sections</h1>
              <div>
                {sections.length > 0 ? (
                  <ul className='list-group'>
                    {sections.map(section => (
                      <li key={section.id} className='list-group-item d-flex justify-content-between align-items-center'>
                        <div>
                          <h5>{section.name}</h5>
                          <p>Office: {section.office}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => handleEditClick(section)}
                            className='btn btn-outline-success btn-sm me-2'
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteSection(section.id)}
                            className='btn btn-outline-danger btn-sm'
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No sections found.</p>
                )}
                <button
                    onClick={() => navigate('/admin/*/create-section')}
                  
                  className='btn btn-primary mt-3'
                >
                  Add Section +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedSection && (
        <div className='row mt-4'>
          <div className='col'>
            <div className='card shadow-sm'>
              <div className='card-body'>
                <h3 className='card-title'>Edit Section</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(selectedSection); }}>
                  <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>Name</label>
                    <input
                      type='text'
                      id='name'
                      value={selectedSection.name}
                      onChange={(e) => setSelectedSection({ ...selectedSection, name: e.target.value })}
                      className='form-control'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='office' className='form-label'>Office</label>
                    <input
                      type='number'
                      id='office'
                      value={selectedSection.office}
                      onChange={(e) => setSelectedSection({ ...selectedSection, office: e.target.value })}
                      className='form-control'
                    />
                  </div>
                  <button type='submit' className='btn btn-success'>Save</button>
                  <button onClick={() => setSelectedSection(null)} className='btn btn-secondary ms-2'>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListSections;
