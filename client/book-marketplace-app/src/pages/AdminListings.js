import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminListings.css';

function AdminListings() {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/login');
    } else {
      fetch('http://localhost:5050/admin/pending')
        .then(res => res.json())
        .then(setListings)
        .catch(err => console.error("Error fetching pending listings:", err));
    }
  }, [role, navigate]);

  return (
    <div className="auth-bg">
      <div className="auth-box" style={{ width: '600px' }}>
        <h2>Pending Listings</h2>
        {listings.length === 0 ? (
          <p>No pending listings.</p>
        ) : (
          listings.map(listing => (
            <div key={listing.listing_id} className="listing-card">
              <h3>{listing.title}</h3>
              <p><strong>Author:</strong> {listing.author}</p>
              <p><strong>Posted by:</strong> {listing.poster_name}</p>
              <p><strong>Type:</strong> {listing.type}</p>
              <p><strong>Status:</strong> {listing.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminListings;
