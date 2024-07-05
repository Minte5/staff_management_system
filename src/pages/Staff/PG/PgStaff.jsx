
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import SideBar from './SideBar';

import ListProjects from './ListProjects';

import Profile from './Profile';

import ListEvents from './ListEvents';
import ListMessages from './ListMessages';


import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import axios from 'axios';

import withAuth from './withAuth'; // Import the withAuth HOC


const PgStaff = () => {
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
                    
                    
                    
                    <Route path="*/list-projects" element={<ListProjects />} />
                    <Route path="*/list-events" element={<ListEvents />} />
                    
                    <Route path="*/profile" element={<Profile />} />
                    
                    <Route path="*/list-messages" element={<ListMessages />} />
                    
                </Routes>
            </div>
        </div>
    </div>
);
};


export default withAuth(PgStaff); 
