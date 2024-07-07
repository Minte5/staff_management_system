import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { Link, useNavigate } from 'react-router-dom';

const ListProjects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState(null); // Track selected project for editing
    const navigate = useNavigate();

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

    const handleSearchChange = async (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.get(`http://0.0.0.0:8888/project/${searchQuery}`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });
            setProjects(response.data ? [response.data] : []);
        } catch (error) {
            console.error('Error searching projects:', error);
            setError('Error searching projects');
            setProjects([]);
        }
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
  

    

    

    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card project-list-card shadow">
                <div className="card-body">
                  <h1 className="mb-4">Project List</h1>
                  <div className="search-area mb-4">
                    <form onSubmit={handleSearch}>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Search projects by ID..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </form>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                  
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map(project => (
                        <tr key={project.id} className="row-clickable">
                          <td><Link to={`/admin/*/project-details/${project.id}`}>{project.name}</Link></td>
                          <td>{project.expected_start_date}</td>
                          <td>{project.expected_end_date}</td>
                          
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
