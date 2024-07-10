
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import SideBar from './SideBar';
import ListUsers from './ListUsers';
import CreateProject from './CreateProject';
import ProjectDetails from './ProjectDetails';
import CreateTask from './CreateTask';
import CreateMessage from './CreateMessage';
import EventDetails from './EventDetails';

import ListProjects from './ListProjects';
import ListAssignees from './ListAssignees';
import ProjectTaskAssignee from './ProjectTaskAssignee';

import Profile from './Profile';

import ListEvents from './ListEvents';
import ListMessages from './ListMessages';

import EventScheduler from './EventScheduler';
import EventScheduleInvitation from './EventScheduleInvitation';



import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import axios from 'axios';

import withAuth from './withAuth'; // Import the withAuth HOC


const PgCoord = () => {
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
                    <Route path="*/create-project" element={<CreateProject />} />
                    <Route path="*/list-projects" element={<ListProjects />} />
                    <Route path="*/project-details/:id" element={<ProjectDetails />} />
                    <Route path="*/list-events" element={<ListEvents />} />
                    <Route path="*/create-task/:projectId" element={<CreateTask />} />
                    <Route path="*/profile" element={<Profile />} />
                    <Route path="*/event-scheduler" element={<EventScheduler />} />
                    <Route path="*/create-message" element={<CreateMessage />} />
                    <Route path="*/EventDetails/:id" element={<EventDetails />} />
                    <Route path="*/event-schedule-invitation" element={<EventScheduleInvitation />} />
                    <Route path="*/list-assignees" element={<ListAssignees />} />
                    <Route path="*/project-task-assignee" element={<ProjectTaskAssignee />} />
                    
                    <Route path="*/list-messages" element={<ListMessages />} />
                    
                </Routes>
            </div>
        </div>
    </div>
);
};


export default withAuth(PgCoord); 
