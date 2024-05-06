
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import SideBar from './SideBar';
import ListUsers from './ListUsers';
import CreateUsers from './CreateUsers';
import CreateProject from './CreateProject';
import ListProjects from './ListProjects';

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
    
      <div >
        
        
        <SideBar />
        <div className="content">
        <Routes>
        
            <Route path="*/users" element={<ListUsers />} />
            <Route path="*/create-user" element={<CreateUsers />} />
            <Route path="*/create-project" element={<CreateProject />} />
            <Route path="*/list-projects" element={<ListProjects />} />
        </Routes>
        </div>
        
      </div>
   
  );
};


export default withAuth(AdminDashboard); // Wrap AdminPage with withAuth HOC
