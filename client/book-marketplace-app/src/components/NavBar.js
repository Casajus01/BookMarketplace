import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="nav-left" onClick={() => navigate('/dashboard')}>
          <span className="nav-icon">🏠</span>
        </div>

        <div className="nav-title">Book Marketplace</div>

        <div className="nav-right" onClick={() => setShowSidebar(true)}>
          <span className="nav-icon">👤</span>
          <div className="nav-label">Account</div>
        </div>
      </nav>

      {showSidebar && (
        <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <h3>My Account</h3>
            <ul>
              <li onClick={() => navigate('/add-listing')}>Add Listing</li>
              <li onClick={() => navigate('/my-listings')}>My Listings</li>
              <li
                onClick={() => {
                  localStorage.clear();
                  navigate('/landing');
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
