import React, { useEffect, useState } from 'react';
import './MyListings.css';

export default function MyListings() {
  const [tab, setTab] = useState('listings'); // 'listings' | 'trades' | 'purchases'
  const [listings, setListings] = useState([]);
  const [userId] = useState(parseInt(localStorage.getItem('user_id')));

  useEffect(() => {
    fetch('http://localhost:5050/listings')
      .then(res => res.json())
      .then(data => setListings(data.filter(l => l.poster_id === userId || l.buyer_id === userId)))
      .catch(console.error);
  }, [userId]);

  const renderListings = () => (
    listings
      .filter(l => l.poster_id === userId)
      .map(listing => (
        <div className="listing-card" key={listing.listing_id}>
          <h4>{listing.title}</h4>
          <p><strong>Author:</strong> {listing.author}</p>
          <p><strong>Type:</strong> {listing.type}</p>
          <p><strong>Status:</strong> {listing.status}</p>
        </div>
      ))
  );

  const renderTrades = () => (
    listings
      .filter(l => l.type === 'trade' && l.poster_id !== userId)
      .map(listing => (
        <div className="listing-card" key={listing.listing_id}>
          <h4>{listing.title}</h4>
          <p><strong>From:</strong> {listing.poster_name}</p>
          <p><strong>Condition:</strong> {listing.book_condition}</p>
          <button onClick={() => alert('Accept with comment flow')}>Accept</button>
          <button>Decline</button>
        </div>
      ))
  );

  const renderPurchases = () => (
    listings
      .filter(l => l.type === 'purchase' && l.buyer_id === userId)
      .map(listing => (
        <div className="listing-card" key={listing.listing_id}>
          <h4>{listing.title}</h4>
          <p><strong>Price:</strong> ${parseFloat(listing.price).toFixed(2)}</p>
          <p><strong>Status:</strong> {listing.status}</p>
        </div>
      ))
  );

  return (
    <div className="mylistings-bg">
      <div className="mylistings-container">
        <div className="sidebar">
          <button className={tab === 'listings' ? 'active' : ''} onClick={() => setTab('listings')}>📚 My Listings</button>
          <button className={tab === 'trades' ? 'active' : ''} onClick={() => setTab('trades')}>🔁 Trade Requests</button>
          <button className={tab === 'purchases' ? 'active' : ''} onClick={() => setTab('purchases')}>💰 Purchase Orders</button>
        </div>

        <div className="main-panel">
          <h2>
            {tab === 'listings' && 'Your Active Listings'}
            {tab === 'trades' && 'Incoming Trade Requests'}
            {tab === 'purchases' && 'Your Purchase Orders'}
          </h2>

          <div className="listing-grid">
            {tab === 'listings' && renderListings()}
            {tab === 'trades' && renderTrades()}
            {tab === 'purchases' && renderPurchases()}
          </div>
        </div>
      </div>
    </div>
  );
}
