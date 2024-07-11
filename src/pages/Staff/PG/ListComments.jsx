import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListComments = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectPk, taskPk } = location.state || {};

    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState({});
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!projectPk || !taskPk) {
            navigate('/'); 
        }
    }, [projectPk, taskPk, navigate]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                const response = await axios.get(`http://0.0.0.0:8888/project/${projectPk}/task/${taskPk}/comment/`, {
                    headers: {
                        Authorization: `Token ${token.key}`
                    }
                });

                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setError('Error fetching comments. Please try again later.');
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

        fetchComments();
        fetchUsers();
    }, [projectPk, taskPk]);

    const handleDeleteComment = async (commentId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.delete(`http://0.0.0.0:8888/project/${projectPk}/task/${taskPk}/comment/${commentId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token.key}`
                }
            });

            setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
            setError('Error deleting comment. Please try again later.');
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!comment.trim()) return;

        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.post(`http://0.0.0.0:8888/project/${projectPk}/task/${taskPk}/comment/`, {
                comment: comment,
                task: taskPk,
                commented_by: token.user_id 
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token.key}`
                }
            });

            setComments((prevComments) => [response.data, ...prevComments]);
            setComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
            setError('Error adding comment. Please try again later.');
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
                    <div className="card comment-list-card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Comment List</h1>
                            {comments.length === 0 ? (
                                <p>No comments found for this task.</p>
                            ) : (
                                <ul className="list-group mt-3">
                                    {comments.map(comment => (
                                        <div key={comment.id}>
                                            <li className="list-group-item">
                                                <strong>{users[comment.commented_by]}</strong>
                                                <p>{comment.comment}</p>
                                                <div>
                                                    <button
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        className='btn btn-danger mt-3'
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            )}
                            <form onSubmit={handleAddComment} className="mt-4">
                                <div className="form-group">
                                    <label htmlFor="comment">Add a comment:</label>
                                    <textarea
                                        id="comment"
                                        className="form-control"
                                        rows="3"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Submit Comment</button>
                            </form>
                            <button className="btn btn-secondary mt-3" onClick={() => navigate('/admin/*/list-projects/')}>Projects</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListComments;
