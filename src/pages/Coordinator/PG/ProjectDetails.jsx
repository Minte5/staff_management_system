import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                console.log('Error fetching project details:', id);
                const response = await axios.get(`http://0.0.0.0:8888/project/${id}/`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type':'application/json',
                        'Authorization': `Token ${token.key}`
                    }
                });

                setProject(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
                setError('Error fetching project details. Please try again later.');
            }
        };

        
        if (id) {
            fetchProjectDetails();
        }
    },[id]);

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
                            <h1 className="mb-4">Project Details</h1>
                            <h1 className="mb-4">{project.name}</h1>
                            <p><strong>Start Date:</strong> {project.expected_start_date}</p>
                            <p><strong>End Date:</strong> {project.expected_end_date}</p>
                            <p><strong>Description:</strong> {project.description}</p>

                            
                            <button
                                onClick={() => navigate(`/coord/*/create-task/${project.id}`)}
                                className='btn btn-primary mt-3'
                            >
                                Add Task +
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
