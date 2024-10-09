// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }
  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;
