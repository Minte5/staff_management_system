import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [tokenExists, setTokenExists] = useState(true);

    useEffect(() => {
      const storedTokenString = localStorage.getItem('token');
      if (!storedTokenString) {
        setTokenExists(false);
      }
    }, []);

    if (!tokenExists) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
