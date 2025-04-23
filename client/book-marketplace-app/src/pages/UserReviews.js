import React from 'react';
import './UserReviews.css';

function UserReviews() {
  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Your Reviews</h2>
        <div className="review-item">
          <p><strong>From:</strong> Alice</p>
          <p><strong>Rating:</strong> ⭐⭐⭐⭐⭐</p>
          <p><strong>Comment:</strong> Great transaction and fast delivery!</p>
        </div>
      </div>
    </div>
  );
}

export default UserReviews;
