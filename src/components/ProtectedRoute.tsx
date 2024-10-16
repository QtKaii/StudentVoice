import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component
 * 
 * This component is used to protect routes that require authentication.
 * If the user is not authenticated, they will be redirected to the signin page.
 * If the user is authenticated, the child routes will be rendered.
 */
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading }: { isAuthenticated: boolean; isLoading: boolean } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/signin');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return null; // or a loading spinner component
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoute;
