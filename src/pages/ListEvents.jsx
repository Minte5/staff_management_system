import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { Link, useNavigate } from 'react-router-dom';

const ListEvents = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event for editing
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                const response = await axios.get('http://0.0.0.0:8888/event_schedule/', {
                    headers: {
                        Authorization: `Token ${token.key}`
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
                setError('Error fetching events');
            }
        };

        fetchEvents();
    }, []);

    const handleSearchChange = async (e) => {
        setSearchQuery(e.target.value);
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.get(`http://0.0.0.0:8888/events?search=${e.target.value}`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error searching events:', error);
            setError('Error searching events');
        }
    };

    const filteredEvents = events.filter(event =>
        event.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = async (eventId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            const response = await axios.get(`http://0.0.0.0:8888/event_schedule/${eventId}`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            setSelectedEvent(response.data);
        } catch (error) {
            console.error('Error fetching event details:', error);
            setError('Error fetching event details');
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.patch(`http://0.0.0.0:8888/event_schedule/${selectedEvent.id}/`, selectedEvent, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });

            // Update the events state with the updated event data
            setEvents(events.map(event => (event.id === selectedEvent.id ? selectedEvent : event)));
            setSelectedEvent(null); // Reset selected event after submitting edits
        } catch (error) {
            console.error('Error updating event:', error);
            setError('Error updating event');
        }
    };

    const handleDelete = async (eventId) => {
        try {
            const storedTokenString = localStorage.getItem('token');
            const token = JSON.parse(storedTokenString);

            await axios.delete(`http://0.0.0.0:8888/event_schedule/${eventId}`, {
                headers: {
                    Authorization: `Token ${token.key}`
                }
            });
            // After successful deletion, update the event list
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
            setError('Error deleting event');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card event-list-card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Event List</h1>
                            <div className="search-area mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search events by name..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                                {error && <p className="text-danger">{error}</p>}
                            </div>
                            
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Link</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEvents.map(event => (
                                        <tr key={event.id} className="row-clickable" onClick={() => (event.id)}>
                                            <td><Link to={`/admin/*/EventDetails/${event.id}`}>{event.subject}</Link></td>
                                            <td>{event.schedule_time}</td>
                                            <td>{event.link}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleEdit(event.id)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDelete(event.id)}>Delete</button>
                                                <button className="btn btn-secondary" onClick={() => navigate(`/admin/*/EventDetails/${event.id}`)}>View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="text-left mb-3">
                                <button
                                    onClick={() => navigate('/admin/*/event-scheduler')}
                                    className='btn btn-primary mt-3'
                                >
                                    Add Event +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedEvent && (
                <div className="row mt-4">
                    <div className="col">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h3 className="card-title">Edit Event</h3>
                                <form onSubmit={handleEditSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="subject" className="form-label">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={selectedEvent.subject}
                                            onChange={(e) => setSelectedEvent({ ...selectedEvent, subject: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label">Date</label>
                                        <input
                                            type="datetime-local"
                                            id="date"
                                            value={selectedEvent.schedule_time}
                                            onChange={(e) => setSelectedEvent({ ...selectedEvent, schedule_time: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="link" className="form-label">Link</label>
                                        <input
                                            type="text"
                                            id="link"
                                            value={selectedEvent.link}
                                            onChange={(e) => setSelectedEvent({ ...selectedEvent, link: e.target.value })}
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success">Save</button>
                                    <button onClick={() => setSelectedEvent(null)} className="btn btn-secondary ms-2">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListEvents;
