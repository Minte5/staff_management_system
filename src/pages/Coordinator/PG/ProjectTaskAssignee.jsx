import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const ProjectTaskAssignee = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectPk, taskPk } = location.state;

    useEffect(() => {
        if (!projectPk || !taskPk) {
            navigate('/'); 
        }
    }, [projectPk, taskPk, navigate]);

    const [formData, setFormData] = useState({
        assignee: '',
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

    const handleChange = (e, { newValue }) => {
        setFormData({ ...formData, assignee: newValue });
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
            assignee: `${suggestion.first_name} ${suggestion.last_name}`, 
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
        placeholder: 'Assignee',
        value: formData.assignee,
        onChange: handleChange,
        name: 'assignee'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`Recipient ID on submit: ${formData.recipientId}`); 
        console.log(`Project PK: ${projectPk}`); 
        console.log(`Task PK: ${taskPk}`); 
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('assignee', formData.recipientId);

            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.post(`http://0.0.0.0:8888/project/${projectPk}/task/${taskPk}/assignee/`, formDataToSend, {
                headers: {
                    Authorization: `Token ${token.key}`,
                }
            });

            console.log('Assignee added successfully:', response.data);

            setFormData({
                assignee: '',
                recipientId: ''
            });
            alert('Assignee added successfully');
            navigate('/admin/*/list-projects');
        } catch (error) {
            console.error('Error assigning task:', error);
        }
    };

    if (!projectPk || !taskPk) {
        return <p>Loading...</p>; 
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Assign Task to User</h1>
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
                                <button type="submit" className="btn btn-primary mt-3">Assign Task</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectTaskAssignee;
