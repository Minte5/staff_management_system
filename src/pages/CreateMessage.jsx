import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateMessage = () => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.post('http://0.0.0.0:8888/messages/', {
                subject,
                description
            }, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            setSuccess('Message created successfully!');
            setSubject('');
            setDescription('');
        } catch (error) {
            console.error('Error creating message:', error);
            setError('Error creating message');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Create Message</h1>
                            {error && <p className="text-danger">{error}</p>}
                            {success && <p className="text-success">{success}</p>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Message Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        rows="5"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Create Message</button>
                                <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={() => navigate(-1)}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMessage;
