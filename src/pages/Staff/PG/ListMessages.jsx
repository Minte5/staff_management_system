import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { Link, useNavigate } from 'react-router-dom';

const ListMessages = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                if (!storedTokenString) {
                    throw new Error("No token found in localStorage");
                }

                const token = JSON.parse(storedTokenString);
                if (!token || !token.key) {
                    throw new Error("Invalid token format");
                }

                const response = await axios.get('http://0.0.0.0:8888/msg/list/', {
                    headers: {
                        Authorization: `Token ${token.key}`
                    }
                });

                console.log('Fetched messages:', response.data);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
                setError('Error fetching messages');
            }
        };

        fetchMessages();
    }, []);

    const handleEdit = async (messageId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.get(`http://0.0.0.0:8888/edit/${messageId}`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            console.log("Message details:", response.data);
            
        } catch (error) {
            console.error('Error fetching message details:', error);
            setError('Error fetching message details');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card message-list-card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Message List</h1>
                            {error && <p className="text-danger">{error}</p>}
                            <div className="text-left mb-3">
                                <button
                                    onClick={() => navigate('/staff/*/create-message')}
                                    className='btn btn-primary mt-3'
                                >
                                    Add Message +
                                </button>
                            </div>
                            <div className="message-list">
                                {messages.length === 0 && <p>No messages found.</p>}
                                {messages.map(message => (
                                    <div key={message.id} className="message-item mb-3">
                                        <h2><Link to={`/staff/*/message-details/${message.id}`}>{message.body}</Link></h2>
                                        <p>Sender: {message.sender}</p>
                                        <p>Created at: {new Date(message.created_at).toLocaleString()}</p>
                                        <p>Updated at: {message.updated_at ? new Date(message.updated_at).toLocaleString() : 'Not updated'}</p>
                                        <div className="actions">
                                            <button className="btn btn-primary mr-2" onClick={() => handleEdit(message.id)}>Reply</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListMessages;
