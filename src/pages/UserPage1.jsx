import React from 'react';
import { Navigate } from 'react-router-dom';

const User1Page = () => {
  const token = localStorage.getItem('token');
  
  // Check if token is null and redirect to login page if it is
  if (!token) {
    return <Navigate to="/" />; // Return null to prevent rendering the User1Page component
  }

  return (
    <div>
      <h2>User1 Panel</h2>
      <p>Welcome to the Staff. You have access to Staff features.</p>
    </div>
  );
};

export default User1Page;
