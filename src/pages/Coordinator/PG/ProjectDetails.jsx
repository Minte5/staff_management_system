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

                const response = await axios.get(`http://0.0.0.0:8888/project/${id}/`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
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
    }, [id]);

    const handleAddTask = () => {
        navigate(`/coord/*/create-task/${id}`);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.delete(`http://0.0.0.0:8888/project/${id}/task/${taskId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token.key}`
                }
            });

            setProject((prevProject) => ({
                ...prevProject,
                tasks: prevProject.tasks.filter(task => task.id !== taskId)
            }));
        } catch (error) {
            console.error('Error deleting task:', error);
            setError('Error deleting task. Please try again later.');
        }
    };

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

                            <h2 className="mt-4">Tasks</h2>
                            {project.tasks.length === 0 ? (
                                <p>No tasks found for this project.</p>
                            ) : (
                                <ul className="list-group mt-3">
                                    {project.tasks.map(task => (
                                        <li key={task.id} className="list-group-item">
                                            <strong>{task.name}</strong>
                                            <p>{task.description}</p>
                                            <div>
                                                <button
                                                    onClick={() => navigate('/coord/*/project-task-assignee', { state: { projectPk: id, taskPk: task.id } })}
                                                    className='btn btn-primary mt-3'
                                                >
                                                    Assign
                                                </button>
                                                <button
                                                    onClick={() => navigate('/coord/*/list-assignees', { state: { projectPk: id, taskPk: task.id } })}
                                                    className='btn btn-success mt-3'
                                                >
                                                    Assignee List
                                                </button>
                                                <button
                                                    onClick={() => navigate('/coord/*/list-comments', { state: { projectPk: id, taskPk: task.id } })}
                                                    className='btn btn-success mt-3'
                                                >
                                                    Comment
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    className='btn btn-danger mt-3'
                                                >
                                                    Delete Task
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <button
                                onClick={handleAddTask}
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
