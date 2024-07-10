import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const CreateTask = () => {
    const { projectId } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [error, setError] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                console.log('Fetching project details for ID:', projectId);
                const response = await axios.get(`http://0.0.0.0:8888/project/${projectId}/`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token.key}`
                    }
                });

                console.log('Project details fetched:', response.data);
                setProjectDetails(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
                setError('Error fetching project details. Please try again later.');
            }
        };

        if (projectId) {
            fetchProjectDetails();
        }
    }, [projectId]);

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.post(`http://0.0.0.0:8888/project/${projectId}/task/`, {
                name: taskName,
                description: taskDescription
            }, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

           
            window.alert('Task created successfully!');
            navigate('/admin/*/list-projects');
            setTaskName('');
            setTaskDescription('');
        } catch (error) {
            console.error('Error creating task:', error);
            setError('Error creating task');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!projectDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card project-card shadow rounded">
                        <div className="card-body">
                            <h2>{projectDetails.name}</h2>
                            <form onSubmit={handleTaskSubmit}>
                                <div className="mb-3 form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="name">Task Name</label>
                                </div>
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        id="taskDescription"
                                        name="taskDescription"
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="taskDescription">Task Description</label>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Create Task</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTask;
