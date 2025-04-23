import React from 'react';
import './BrowseListings.css';

function BrowseListings() {
  return (
    <div className="browse-bg">
      <div className="browse-container">
        <h2>Browse Listings</h2>
        <div className="listing-grid">
          {/* Placeholder for book cards */}
          <div className="book-card">
            <h3>Book Title</h3>
            <p>Author: John Doe</p>
            <p>Genre: Fiction</p>
            <p>Condition: Like New</p>
            <button>View Details</button>
          </div>

          {/* Duplicate this block as needed or map through data */}
        </div>
      </div>
    </div>
  );
}

export default BrowseListings;
