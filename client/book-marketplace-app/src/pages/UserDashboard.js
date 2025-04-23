import React from 'react';
import './UserDashboard.css';

function UserDashboard() {
  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>My Dashboard</h2>
        <ul className="dashboard-links">
          <li><a href="/add-listing">📚 My Listings</a></li>
          <li><a href="/wishlist">💖 Wishlist</a></li>
          <li><a href="/reviews">⭐ Reviews</a></li>
          <li><a href="/browse">🔍 Browse More</a></li>
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;
