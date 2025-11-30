// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  const loginTime = localStorage.getItem('loginTime');

  const isExpired = () => {
    if (!loginTime) return true;
    const now = Date.now(); // current timestamp in ms
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    return now - parseInt(loginTime, 10) > oneHour;
  };

  if (!token || isExpired()) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('loginTime');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
