import React from 'react';
import './Wishlist.css';

function Wishlist() {
  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Your Wishlist</h2>
        <ul className="wishlist-list">
          <li>Pride & Prejudice by Jane Austen</li>
          <li>The Alchemist by Paulo Coelho</li>
        </ul>
      </div>
    </div>
  );
}

export default Wishlist;
