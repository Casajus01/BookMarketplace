import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './WelcomeScreen.css';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get name from route state or decode from token
  const nameFromState = location.state?.name;
  const token = localStorage.getItem('token');
  const decoded = token ? jwtDecode(token) : {};
  const nameFromToken = decoded.name;

  const displayName = nameFromState || nameFromToken || 'Reader';

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Welcome to Book Marketplace, {displayName}!</h2>
        <p className="welcome-msg">You have successfully logged in.</p>
        <button onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
