import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { Link, useNavigate } from 'react-router-dom';

const ListEvents = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
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

    

    

    return (
        <div className="container mt-5">
            <h1 className='display-6 mb-4'><b>Coordinators Dashboard</b></h1>
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
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEvents.map(event => (
                                        <tr key={event.id} className="row-clickable" onClick={() => (event.id)}>
                                            <td><Link to={`/admin/*/event-details/${event.id}`}>{event.subject}</Link></td>

                                            <td>{event.schedule_time}</td>
                                            <td>{event.link}</td>
                                            
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListEvents;
