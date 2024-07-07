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

            const response = await axios.get(`http://0.0.0.0:8888/project/${searchQuery}/`, {
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

    const handleEdit = async (projectId) => {
        console.log('Editing project with ID:', projectId); 
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.get(`http://0.0.0.0:8888/project/${projectId}/`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            setSelectedProject(response.data);
        } catch (error) {
            console.error('Error fetching project details:', error);
            setError('Error fetching project details');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);
            // Send a request to your backend to update the project data
            await axios.patch(`http://0.0.0.0:8888/project/${selectedProject.id}/`, selectedProject, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            // Update the projects state with the updated project data
            setProjects(projects.map(project => (project.id === selectedProject.id ? selectedProject : project)));
            setSelectedProject(null); // Reset selected project after submitting edits
        } catch (error) {
            console.error('Error updating project:', error);
            setError('Error updating project');
        }
    };

    const handleDelete = async (projectId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.delete(`http://0.0.0.0:8888/project/${projectId}/`, {
                headers: {
                    'Authorization': `Token ${token.key}`
                }
            });
            // After successful deletion, update the project list
            setProjects(projects.filter(project => project.id !== projectId));
        } catch (error) {
            console.error('Error deleting project:', error);
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
                                        <tr key={project.id} className="row-clickable">
                                            <td><Link to={`/admin/*/project-details/${project.id}`}>{project.name}</Link></td>
                                            <td>{project.expected_start_date}</td>
                                            <td>{project.expected_end_date}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleEdit(project.id)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(project.id)}>Delete</button>
                                                <button className="btn btn-secondary" onClick={() => navigate(`/admin/*/project-details/${project.id}`)}>View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {selectedProject && (
                <div className="row mt-4">
                    <div className="col">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title">Edit Project</h3>
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={selectedProject.name}
                                            onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Description</label>
                                        <textarea
                                            type="text"
                                            id="name"
                                            value={selectedProject.description}
                                            onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="startDate" className="form-label">Start Date</label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            value={selectedProject.expected_start_date}
                                            onChange={(e) => setSelectedProject({ ...selectedProject, expected_start_date: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="endDate" className="form-label">End Date</label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            value={selectedProject.expected_end_date}
                                            onChange={(e) => setSelectedProject({ ...selectedProject, expected_end_date: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success">Save</button>
                                    <button onClick={() => setSelectedProject(null)} className="btn btn-secondary ms-2">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListProjects;
