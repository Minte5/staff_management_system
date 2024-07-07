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
                const token = JSON.parse(storedTokenString);

                const response = await axios.get('http://0.0.0.0:8888/notifications/', {
                    headers: {
                        Authorization: `Token ${token.key}`
                    }
                });
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

    const handleDelete = async (messageId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.delete(`http://0.0.0.0:8888/messages/${messageId}`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });
            // After successful deletion, update the message list
            setMessages(messages.filter(message => message.id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
            setError('Error deleting message');
        }
    };

    return (
        <div className="container mt-5">
          <h1 className='display-6 mb-4'><b>Coordinators Dashboard</b></h1>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card message-list-card shadow">
                <div className="card-body">
                  <h1 className="mb-4">Message List</h1>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="text-left mb-3">
                    <button
                      onClick={() => navigate('/admin/*/create-message')}
                      className='btn btn-primary mt-3'
                    >
                      Add Message +
                    </button>
                  </div>
                  <div className="message-list">
                    {messages.map(message => (
                      <div key={message.id} className="message-item mb-3">
                        <h2><Link to={`/admin/*/message-details/${message.id}`}>{message.verb}</Link></h2>
                        <p>{message.description}</p>
                        <p><small>{message.timestamp}</small></p>
                        <div className="actions">
                          <button className="btn btn-primary mr-2" onClick={() => handleEdit(message.id)}>Edit</button>
                          <button className="btn btn-danger mr-2" onClick={() => handleDelete(message.id)}>Delete</button>
                          <button className="btn btn-secondary" onClick={() => navigate(`/admin/*/message-details/${message.id}`)}>View Details</button>
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
