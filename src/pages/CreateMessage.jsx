import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateMessage = () => {
    const [formData, setFormData] = useState({
        actor_object_id: '',
        actor_content_type: '',
        verb: '',
        description: '',
        timestamp: '',
        data: '',
        recipient: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.post('http://0.0.0.0:8888/notifications/', formData, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            setSuccess('Message created successfully!');
            setFormData({
                actor_object_id: '',
                actor_content_type: '',
                verb: '',
                description: '',
                timestamp: '',
                data: '',
                recipient: ''
            });
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
                                    <label htmlFor="actor_object_id">Actor Object ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="actor_object_id"
                                        name="actor_object_id"
                                        value={formData.actor_object_id}
                                        onChange={handleChange}
                                        maxLength={255}
                                        minLength={1}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="actor_content_type">Actor Content Type</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="actor_content_type"
                                        name="actor_content_type"
                                        value={formData.actor_content_type}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="verb">Verb</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="verb"
                                        name="verb"
                                        value={formData.verb}
                                        onChange={handleChange}
                                        maxLength={255}
                                        minLength={1}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="5"
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="timestamp">Timestamp</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        id="timestamp"
                                        name="timestamp"
                                        value={formData.timestamp}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="data">Data</label>
                                    <textarea
                                        className="form-control"
                                        id="data"
                                        name="data"
                                        rows="3"
                                        value={formData.data}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="recipient">Recipient</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="recipient"
                                        name="recipient"
                                        value={formData.recipient}
                                        onChange={handleChange}
                                        required
                                    />
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
