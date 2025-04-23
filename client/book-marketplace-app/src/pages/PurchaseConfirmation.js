import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PurchaseConfirmation.css';

export default function PurchaseConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { listing } = location.state || {};
  const [statusUpdated, setStatusUpdated] = useState(false);

  useEffect(() => {
    if (listing && listing.listing_id) {
      fetch(`http://localhost:5050/listings/${listing.listing_id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'sold' })
      })
        .then(res => {
          if (res.ok) setStatusUpdated(true);
          else console.error('Failed to update listing status');
        })
        .catch(err => console.error(err));
    }
  }, [listing]);

  if (!listing) {
    return (
      <div className="auth-bg">
        <div className="auth-box">
          <h2>Error</h2>
          <p>Listing not found.</p>
          <button onClick={() => navigate('/browse')}>Back to Listings</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Purchase Confirmed!</h2>
        <p>
          You’ve successfully requested to purchase <strong>{listing.title}</strong> by{' '}
          <em>{listing.author}</em>.
        </p>
        <p>Price: <strong>${parseFloat(listing.price).toFixed(2)}</strong></p>
        <p>The seller has been notified and will contact you shortly.</p>

        <button onClick={() => navigate('/browse')}>Back to Listings</button>
      </div>
    </div>
  );
}
