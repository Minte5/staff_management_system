import React, { useState } from 'react';
import axios from 'axios';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';

const EventScheduler = () => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    schedule_time: '',
    link: ''
  });
  const [errors, setErrors] = useState({});
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
      
      const response = await axios.post('http://0.0.0.0:8888/event_schedule/', formData, {
        headers: {
          Authorization: `Token ${token.key}` 
        }
      });
      console.log('Event scheduled successfully:', response.data);
      // Clear form data after successful submission
      setFormData({
        subject: '',
        description: '',
        schedule_time: '',
        link: ''
      });
      setErrors({});
      alert('Event created successfully');
      navigate('/coord/*/list-events');
    } catch (error) {
      console.error('Error scheduling event:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card event-card shadow rounded">
            <div className="card-body">
              <h2 className="mb-4 text-center">Schedule Event</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    maxLength={100}
                    required
                  />
                  <label htmlFor="subject">Event Subject</label>
                </div>
                <div className="mb-3 form-floating">
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <label htmlFor="description">Event Description</label>
                </div>
                <div className="mb-3 form-floating">
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="schedule_time"
                    name="schedule_time"
                    value={formData.schedule_time}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="schedule_time">Schedule Time</label>
                </div>

                <div className="mb-3 form-floating">
                  <textarea
                    className="form-control"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                  />
                  <label htmlFor="link">Link (optional)</label>
                </div>


                <button type="submit" className="btn btn-primary">Schedule</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventScheduler;
