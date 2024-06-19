
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthLayout = ({ children, authentication }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    // Example: Check for a token or any other auth mechanism
    return Boolean(localStorage.getItem('token'));
  };

  useEffect(() => {
    if (authentication && !isAuthenticated()) {
      navigate('/login');
    }
  }, [authentication, navigate]);

  return (authentication && !isAuthenticated()) ? null : children;
};

export default AuthLayout;
