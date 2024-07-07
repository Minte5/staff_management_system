
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import SideBar from './SideBar';
import ListUsers from './ListUsers';
import CreateUsers from './CreateUsers';
import CreateProject from './CreateProject';
import ListProjects from './ListProjects';
import EventScheduler from './EventScheduler';
import Profile from './Profile';
import ProjectDetails from './ProjectDetails';
import ListEvents from './ListEvents';
import ListMessages from './ListMessages';
import CreateMessage from './CreateMessage';
import ListSections from './ListSections';
import CreateSection from './CreateSection';
import CreateTask from './CreateTask';
import EventDetails from './EventDetails';

import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import axios from 'axios';

import withAuth from './withAuth'; // Import the withAuth HOC


const AdminDashboard = () => {
  const [tokenExists, setTokenExists] = useState(true);
  useEffect(() => {
    const storedTokenString = localStorage.getItem('token');
    if (!storedTokenString) {
      setTokenExists(false);
      return;
    }

    const token = JSON.parse(storedTokenString);
    console.log('Stored Token:', token);

    // Check if token has expired
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    if (token.expires && token.expires < currentTime) {
      // Token has expired, clear it from local storage and redirect to login page
      localStorage.removeItem('token');
      setTokenExists(false);
      return;
    }

    // Token is valid, don't fetch users initially
  }, []);






  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-2 p-0">
                <SideBar />
            </div>
            <div className="col-10 content p-1">
                <Routes>
                    <Route path="*/users" element={<ListUsers />} />
                    <Route path="*/create-user" element={<CreateUsers />} />
                    <Route path="*/create-project" element={<CreateProject />} />
                    <Route path="*/list-projects" element={<ListProjects />} />
                    <Route path="*/list-events" element={<ListEvents />} />
                    <Route path="*/event-scheduler" element={<EventScheduler />} />
                    <Route path="*/profile" element={<Profile />} />
                    <Route path="*/project-details/:id" element={<ProjectDetails />} />
                    <Route path="*/create-task/:projectId" element={<CreateTask />} />
                    <Route path="*/list-messages" element={<ListMessages />} />
                    <Route path="*/create-message" element={<CreateMessage />} />
                    <Route path="*/list-sections" element={<ListSections />} />
                    <Route path="*/create-section" element={<CreateSection />} />
                    <Route path="*/EventDetails/:id" element={<EventDetails />} />
                </Routes>
            </div>
        </div>
    </div>
);
};


export default withAuth(AdminDashboard); // Wrap AdminPage with withAuth HOC
