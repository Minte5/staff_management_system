import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { Link , useNavigate  } from 'react-router-dom';

const ListProjects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

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
        <div className='main'>
            <div className="recentOrders">
                <div className="search-area">
                    <h1>Project List</h1>
                    <input
                        type="number"
                        placeholder="Search projects Using ID..."
                        value={searchQuery}
                        onChange={(e, projectId) => handleSearchChange(e, projectId)}
                    />
                    {error && <p>{error}</p>}

                    {filteredProjects.map(project => (
                        <Link key={project.id} to={`/project-details/${project.id}`} className="recentOrders" style={{ color: 'inherit', textDecoration: 'none' }}>
                            <div>
                                <h3>{project.name}</h3>
                                {/*<p>Description: {project.description}</p>*/}
                                <p>Start Date: {project.expected_start_date} ----------- End Date: {project.expected_end_date}</p>
                                {/*<p>End Date: {project.expected_end_date}</p>
                                <p>Owner: {project.owner}</p>
                                <p>Created At: {project.created_at}</p>
                                <p>Updated At: {project.updated_at}</p>
                                <p>Id: {project.id}</p>*/}
                                <div>
                                    <button className="edit" onClick={() => handleEdit(project.id)}>
                                        Edit
                                    </button>
                                    <button className="delete" onClick={() => handleDelete(project.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}




                    

                </div>
            </div>
        </div>
    );
};

export default ListProjects;
