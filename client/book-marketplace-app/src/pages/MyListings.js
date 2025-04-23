import React, { useEffect, useState } from 'react';
import './MyListings.css';

export default function MyListings() {
  const [activeTab, setActiveTab] = useState('myListings');
  const [listings, setListings] = useState([]);
  const userId = parseInt(localStorage.getItem('user_id'));

  useEffect(() => {
    fetch('http://localhost:5050/listings/all')
      .then(res => res.json())
      .then(setListings)
      .catch(console.error);
  }, []);

  const myListings = listings.filter(l => l.poster_id === userId);
  const purchaseOrders = listings.filter(l => l.buyer_id === userId);
  const booksSold = listings.filter(l => l.seller_id === userId);
  const tradeRequests = listings.filter(
    l => l.type === 'trade' && l.poster_id !== userId && l.owner_id === userId
  );

  const renderTab = () => {
    let displayList = [];
    let title = '';

    switch (activeTab) {
      case 'myListings':
        title = 'My Listings';
        displayList = myListings;
        break;
      case 'tradeRequests':
        title = 'Trade Requests';
        displayList = tradeRequests;
        break;
      case 'purchaseOrders':
        title = 'Purchase Orders';
        displayList = purchaseOrders;
        break;
      case 'booksSold':
        title = 'Books Sold';
        displayList = booksSold;
        break;
      default:
        break;
    }

    return (
      <div className="main-panel">
        <h2>{title}</h2>
        <ul>
          {displayList.length === 0 ? (
            <li>No items to show.</li>
          ) : (
            displayList.map((item) => (
              <li key={item.listing_id}>
                <span>
                  📘 <strong>{item.title}</strong> by {item.author} — {item.type}
                </span>
                <span>Status: {item.status}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="mylistings-bg">
      <div className="mylistings-container">
        <div className="sidebar">
          <button className={activeTab === 'myListings' ? 'active' : ''} onClick={() => setActiveTab('myListings')}>📚 My Listings</button>
          <button className={activeTab === 'tradeRequests' ? 'active' : ''} onClick={() => setActiveTab('tradeRequests')}>🔁 Trade Requests</button>
          <button className={activeTab === 'purchaseOrders' ? 'active' : ''} onClick={() => setActiveTab('purchaseOrders')}>💳 Purchase Orders</button>
          <button className={activeTab === 'booksSold' ? 'active' : ''} onClick={() => setActiveTab('booksSold')}>💰 Books Sold</button>
        </div>
        {renderTab()}
      </div>
    </div>
  );
}
