import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const CreateMessage = () => {
    const [formData, setFormData] = useState({
        recipient: '',
        message: '',
        attachment: null
    });

    const [suggestions, setSuggestions] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.get('http://0.0.0.0:8888/users/', {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, attachment: file });
    };

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : users.filter(user =>
            user.first_name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        setFormData({ ...formData, recipient: `${suggestion.first_name} ${suggestion.last_name}` });
    };

    const getSuggestionValue = (suggestion) => `${suggestion.first_name} ${suggestion.last_name}`;

    const renderSuggestion = (suggestion) => (
        <div>
            {suggestion.first_name} {suggestion.last_name}
        </div>
    );

    const inputProps = {
        placeholder: 'Recipient',
        value: formData.recipient,
        onChange: handleChange,
        name: 'recipient'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('recipient', formData.recipient);
            formDataToSend.append('message', formData.message);
            if (formData.attachment) {
                formDataToSend.append('attachment', formData.attachment);
            }

            const response = await axios.post('http://api.example.com/send-email', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Message sent successfully:', response.data);
            
            setFormData({
                recipient: '',
                message: '',
                attachment: null
            });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Compose Message</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
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
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="attachment">Attachment</label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="attachment"
                                        name="attachment"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMessage;
