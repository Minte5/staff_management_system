import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { Link , useNavigate  } from 'react-router-dom';

const ListProjects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                const response = await axios.get('http://0.0.0.0:8888/project/', {
                    headers: {
                        Authorization: `Token ${token.key}`
                    }
                });
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError('Error fetching projects');
            }
        };

        fetchProjects();
    }, []);

    const handleSearchChange = async (e, id) => {
        setSearchQuery(e.target.value);
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.get(`http://0.0.0.0:8888/project/${id}`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });
            setProjects(response.data);
        } catch (error) {
            console.error('Error searching projects:', error);
            setError('Error searching projects');
        }
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = async (projectId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.get(`http://0.0.0.0:8888/edit/${projectId}`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            // Now you have the project details in the response.data
            console.log("Project details:", response.data);
            // You can then navigate to a different page/component for editing,
            // passing the project details as props, or update state to show an editing form
        } catch (error) {
            console.error('Error fetching project details:', error);
            setError('Error fetching project details');
        }
    };

    const handleDelete = async (projectId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.delete(`http://0.0.0.0:8888/project/${projectId}`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });
            // After successful deletion, update the project list
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
            console.error( projectId);
            setError('Error deleting project');
        }
    };

    

    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card project-list-card shadow">
                <div className="card-body">
                  <h1 className="mb-4">Project List</h1>
                  <div className="search-area mb-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Search projects by ID..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                  <div className="text-left mb-3">
                  <button
                    onClick={() => navigate('/admin/*/create-project')}
                    className='btn btn-primary mt-3'
                  >
                    Create Project +
                  </button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map(project => (
                        <tr key={project.id} className="row-clickable" onClick={() => (project.id)}>
                          <td><Link to={`/project-details/${project.id}`}>{project.name}</Link></td>
                          <td>{project.expected_start_date}</td>
                          <td>{project.expected_end_date}</td>
                          <td>
                            <button className="btn btn-primary" onClick={() => handleEdit(project.id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(project.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};

export default ListProjects;
