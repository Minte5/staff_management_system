import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const EventScheduleInvitation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const eventSchedulePk = location.state?.eventSchedulePk;

    useEffect(() => {
        if (!eventSchedulePk) {
            
            navigate('/'); 
        }
    }, [eventSchedulePk, navigate]);

    const [formData, setFormData] = useState({
        recipient: '',
        recipientId: '' 
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
        setFormData({ 
            ...formData, 
            recipient: `${suggestion.first_name} ${suggestion.last_name}`, 
            recipientId: suggestion.id 
        });
        console.log(`Selected recipient ID: ${suggestion.id}`); 
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
        console.log(`Recipient ID on submit: ${formData.recipientId}`); 
        console.log(`Event Schedule PK: ${eventSchedulePk}`); 
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('recipient', formData.recipientId); 

            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.post(`http://0.0.0.0:8888/event_schedule/${eventSchedulePk}/invitation/`, formDataToSend, {
                headers: {
                    Authorization: `Token ${token.key}`,
                    //'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Invitation sent successfully:', response.data);

            setFormData({
                recipient: '',
                recipientId: ''
            });
            alert('Invitation sent successfully');
            navigate('/admin/*/list-events');
        } catch (error) {
            console.error('Error sending invitation:', error);
        }
    };

    if (!eventSchedulePk) {
        return <p>Loading...</p>; // Show a loading message or redirect
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Send Event Invitation</h1>
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
                                <button type="submit" className="btn btn-primary mt-3">Send Invitation</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventScheduleInvitation;
