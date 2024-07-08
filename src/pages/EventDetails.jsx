import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const storedTokenString = localStorage.getItem('token');
                const token = JSON.parse(storedTokenString);

                const response = await axios.get(`http://0.0.0.0:8888/event_schedule/${id}/`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token.key}`
                    }
                });

                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
                setError('Error fetching event details. Please try again later.');
            }
        };

        if (id) {
            fetchEventDetails();
        }
    }, [id]);

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    if (!event) {
        return <p>Loading event details...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card event-details-card shadow">
                        <div className="card-body">
                            <h1 className="mb-4">Event Details</h1>
                            <h1 className="mb-4">{event.subject}</h1>
                            <p><strong>Description:</strong> {event.description}</p>
                            <p><strong>Date:</strong> {event.schedule_time}</p>
                            <p><strong>Link:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer">{event.link}</a></p>
                            <div className="text-left mb-3">
                                <button
                                    onClick={() => navigate('/admin/*/event-schedule-invitation', { state: { eventSchedulePk: id } })}
                                    className='btn btn-primary mt-3'
                                >
                                    Invite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
