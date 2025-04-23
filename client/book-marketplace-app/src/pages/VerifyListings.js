import React, { useEffect, useState } from 'react';
import './VerifyListings.css';

export default function VerifyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const res = await fetch('http://localhost:5000/listings/all');
      const data = await res.json();
      setListings(data.filter(listing => listing.status === 'pending'));
    } catch (err) {
      console.error('Failed to fetch listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleVerify = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/listings/${id}/verify`, {
        method: 'PATCH',
      });
      if (res.ok) {
        alert('Listing verified');
        fetchListings();
      } else {
        alert('Failed to verify listing');
      }
    } catch (err) {
      console.error('Error verifying listing:', err);
    }
  };

  return (
    <div className="verify-bg">
      <div className="verify-container">
        <h2>Pending Listings for Verification</h2>
        {loading ? (
          <p>Loading...</p>
        ) : listings.length === 0 ? (
          <p>No pending listings.</p>
        ) : (
          <div className="verify-grid">
            {listings.map(listing => (
              <div key={listing.listing_id} className="verify-card">
                <h3>{listing.title || 'Untitled Book'}</h3>
                <p><strong>Author:</strong> {listing.author}</p>
                <p><strong>Type:</strong> {listing.type}</p>
                <p><strong>Status:</strong> {listing.status}</p>
                {listing.type === 'purchase' && (
                  <p><strong>Price:</strong> ${parseFloat(listing.price).toFixed(2)}</p>
                )}
                <button onClick={() => handleVerify(listing.listing_id)}>
                  ✅ Verify Listing
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
