import React, { useState } from 'react';
import './VerifyListings.css';

function VerifyListings() {
  const [pendingListings, setPendingListings] = useState([
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      condition: "Good",
    },
    {
      id: 2,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      condition: "Like New",
    },
  ]);

  const handleApprove = (id) => {
    alert(`Listing ${id} approved`);
    setPendingListings(pendingListings.filter(listing => listing.id !== id));
  };

  const handleReject = (id) => {
    alert(`Listing ${id} rejected`);
    setPendingListings(pendingListings.filter(listing => listing.id !== id));
  };

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Verify Listings</h2>
        {pendingListings.length === 0 ? (
          <p>No pending listings.</p>
        ) : (
          <ul className="verify-list">
            {pendingListings.map((listing) => (
              <li key={listing.id}>
                <h3>{listing.title}</h3>
                <p><strong>Author:</strong> {listing.author}</p>
                <p><strong>Genre:</strong> {listing.genre}</p>
                <p><strong>Condition:</strong> {listing.condition}</p>
                <div className="btn-row">
                  <button className="approve-btn" onClick={() => handleApprove(listing.id)}>Approve</button>
                  <button className="reject-btn" onClick={() => handleReject(listing.id)}>Reject</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default VerifyListings;
