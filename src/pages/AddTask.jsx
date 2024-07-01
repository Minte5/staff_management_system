// AddTask.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask = () => {
    const { id } = useParams();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddTask = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.post(`http://0.0.0.0:8888/project/${id}/add-task`, {
                name: taskName,
                description: taskDescription
            }, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            setTaskName('');
            setTaskDescription('');
            navigate(`/project-details/${id}`);
        } catch (error) {
            console.error('Error adding task:', error);
            setError('Error adding task');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Add Task</h1>
                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={handleAddTask}>
                                <div className="form-group">
                                    <label htmlFor="taskName">Task Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="taskName"
                                        value={taskName}
                                        onChange={(e) => setTaskName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="taskDescription">Task Description</label>
                                    <textarea
                                        className="form-control"
                                        id="taskDescription"
                                        value={taskDescription}
                                        onChange={(e) => setTaskDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-success mt-3">Add Task</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
