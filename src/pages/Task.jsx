import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
    const { projectId } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const [error, setError] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [assignee, setAssignee] = useState('');
    const [deadline, setDeadline] = useState('');

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                const response = await axios.get(`http://0.0.0.0:8888/project/${projectId}`, {
                    headers: {
                        Authorization: `Token ${token.key}`
                    }
                });
                setProjectDetails(response.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
                setError('Error fetching project details');
            }
        };

        fetchProjectDetails();
    }, [projectId]);

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.post(`http://0.0.0.0:8888/project/${projectId}/tasks/`, {
                name: taskName,
                assignee: assignee,
                deadline: deadline
            }, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            // Clear form fields after successful task creation
            setTaskName('');
            setAssignee('');
            setDeadline('');

            // Optionally, you can fetch project details again to update the task list
            // fetchProjectDetails();
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
        <div>
            <h1>Project Details</h1>
            <h2>{projectDetails.name}</h2>
            <p>Description: {projectDetails.description}</p>
            <p>Start Date: {projectDetails.expected_start_date}</p>
            <p>End Date: {projectDetails.expected_end_date}</p>

            <h2>Create Task</h2>
            <form onSubmit={handleTaskSubmit}>
                <div>
                    <label>Task Name:</label>
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </div>
                <div>
                    <label>Assignee:</label>
                    <input type="text" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
                </div>
                <div>
                    <label>Deadline:</label>
                    <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </div>
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default ProjectDetails;
