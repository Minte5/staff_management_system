import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListAssignees = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectPk, taskPk } = location.state || {};

    const [assignees, setAssignees] = useState([]);
    const [users, setUsers] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!projectPk || !taskPk) {
            navigate('/'); 
        }
    }, [projectPk, taskPk, navigate]);

    useEffect(() => {
        const fetchAssignees = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                const response = await axios.get(`http://0.0.0.0:8888/project/${projectPk}/task/${taskPk}/assignee/`, {
                    headers: {
                        Authorization: `Token ${token.key}`
                    }
                });

                setAssignees(response.data);
            } catch (error) {
                console.error('Error fetching assignees:', error);
                setError('Error fetching assignees. Please try again later.');
            }
        };

        const fetchUsers = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                const response = await axios.get('http://0.0.0.0:8888/users/', {
                    headers: {
                        Authorization: `Token ${token.key}`
                    }
                });

                const usersMap = response.data.reduce((map, user) => {
                    map[user.id] = `${user.first_name} ${user.last_name}`;
                    return map;
                }, {});

                setUsers(usersMap);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchAssignees();
        fetchUsers();
    }, [projectPk, taskPk]);

    const handleDeleteAssignee = async (assigneeId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.delete(`http://0.0.0.0:8888/project/${projectPk}/task/${taskPk}/assignee/${assigneeId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token.key}`
                }
            });

            setAssignees((prevAssignees) => prevAssignees.filter(assignee => assignee.id !== assigneeId));
        } catch (error) {
            console.error('Error deleting assignee:', error);
            setError('Error deleting assignee. Please try again later.');
        }
    };

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    if (!projectPk || !taskPk) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card assignee-list-card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Assignee List</h1>
                            {assignees.length === 0 ? (
                                <p>No assignees found for this task.</p>
                            ) : (
                                <ul className="list-group mt-3">
                                    {assignees.map(assignee => (
                                        <div key={assignee.id}>
                                            <li className="list-group-item">
                                                <strong>{users[assignee.assignee]}</strong>
                                                <div>
                                                    <button
                                                        onClick={() => handleDeleteAssignee(assignee.id)}
                                                        className='btn btn-danger mt-3'
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                            <button className="btn btn-secondary" onClick={() => navigate('/admin/*/list-projects/')}>Projects</button>
                                        </div>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListAssignees;
