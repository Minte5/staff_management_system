import React from 'react';
import { Navigate } from 'react-router-dom';
import SideBar from '../SideBar';


const UgCoord = () => {
  const token = localStorage.getItem('token');
  
  // Check if token is null and redirect to login page if it is
  if (!token) {
    return <Navigate to="/" />; // Return null to prevent rendering the User1Page component
  }

  return (
    <div>
      <SideBar />
      <div>
        <h2>UgCoord Panel</h2>
        <p>Welcome to the Staff. You have access to Staff features.</p>
      </div>
      
    </div>
  );
};

export default UgCoord;
