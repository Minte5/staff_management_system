// ProjectDetails.js
import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                const response = await axios.get(`http://0.0.0.0:8888/project/${id}`, {
                    headers: {
                        Authorization: `Token ${token.key}`
                    }
                });
                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
                setError('Error fetching project details');
            }
        };

        fetchProjectDetails();
    }, [id]);

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    if (!project) {
        return <p>Loading project details...</p>;
    }

    return (
        
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card project-details-card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Project List</h1>
                            <h1 className="mb-4">{project.name}</h1>
                            <p><strong>Start Date:</strong> {project.expected_start_date}</p>
                            <p><strong>End Date:</strong> {project.expected_end_date}</p>
                            <p><strong>Description:</strong> {project.description}</p>
                            {/* Add more project details here as needed */}
                            <button className="btn btn-primary mt-3" onClick={() => navigate(`/edit-project/${id}`)}>Edit Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
