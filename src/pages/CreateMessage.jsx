import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';

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
    const [recipients, setRecipients] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the list of recipients when the component mounts
        const fetchRecipients = async () => {
            try {
                const response = await axios.get('http://0.0.0.0:8888/api/users/');
                setRecipients(response.data);
            } catch (error) {
                console.error('Error fetching recipients:', error);
            }
        };

        fetchRecipients();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const data = new FormData();
            data.append('actor_object_id', formData.actor_object_id);
            data.append('actor_content_type', formData.actor_content_type);
            data.append('verb', formData.verb);
            data.append('description', formData.description);
            data.append('timestamp', formData.timestamp);
            data.append('data', formData.data);
            data.append('recipient', formData.recipient);
            if (file) {
                data.append('file', file);
            }

            const response = await axios.post('http://0.0.0.0:8888/notifications/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
            setFile(null);
            setValue('');
        } catch (error) {
            console.error('Error creating message:', error);
            setError('Error creating message');
        }
    };

    // Autosuggest functions
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : recipients.filter(recipient =>
            recipient.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const getSuggestionValue = suggestion => suggestion.name;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        setFormData({ ...formData, recipient: suggestion.id });
    };

    const inputProps = {
        placeholder: 'Type a recipient name',
        value,
        onChange: (e, { newValue }) => setValue(newValue)
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
                                    <Autosuggest
                                        suggestions={suggestions}
                                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                                        getSuggestionValue={getSuggestionValue}
                                        renderSuggestion={renderSuggestion}
                                        inputProps={inputProps}
                                        onSuggestionSelected={onSuggestionSelected}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="file">File Attachment</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="file"
                                        name="file"
                                        onChange={handleFileChange}
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
