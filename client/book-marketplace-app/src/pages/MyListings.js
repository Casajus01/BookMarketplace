import React, { useEffect, useState } from 'react';
import './MyListings.css';

export default function MyListings() {
  const userId = parseInt(localStorage.getItem('user_id'));
  const [activeTab, setActiveTab] = useState('myListings');
  const [myListings, setMyListings] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [booksSold, setBooksSold] = useState([]);
  const [tradeRequests, setTradeRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/listings/all')
      .then(res => res.json())
      .then(data => {
        setMyListings(Array.isArray(data) ? data.filter(item => item.poster_id === userId) : []);
        setTradeRequests(
          Array.isArray(data)
            ? data.filter(item => item.type === 'trade' && item.poster_id !== userId && item.owner_id === userId)
            : []
        );
      })
      .catch(() => {
        setMyListings([]);
        setTradeRequests([]);
      });

    fetch(`http://localhost:5050/listings/purchase-orders/${userId}`)
      .then(res => res.json())
      .then(data => setPurchaseOrders(Array.isArray(data) ? data : []))
      .catch(() => setPurchaseOrders([]));

    fetch(`http://localhost:5050/listings/books-sold/${userId}`)
      .then(res => res.json())
      .then(data => setBooksSold(Array.isArray(data) ? data : []))
      .catch(() => setBooksSold([]));
  }, [userId]);

  const renderList = (items, labelFn) => {
    const safeItems = Array.isArray(items) ? items : [];
    return (
      <ul>
        {safeItems.length === 0 ? (
          <li>No items to show.</li>
        ) : (
          safeItems.map(item => (
            <li key={item.listing_id || item.book_id}>
              {labelFn(item)}
            </li>
          ))
        )}
      </ul>
    );
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'myListings':
        return (
          <div className="main-panel">
            <h2>My Listings</h2>
            {renderList(myListings, (item) => (
              <>
                📘 <strong>{item.title}</strong> by {item.author} — {item.type}{' '}
                <span>Status: {item.status}</span>
              </>
            ))}
          </div>
        );
      case 'tradeRequests':
        return (
          <div className="main-panel">
            <h2>Trade Requests</h2>
            {renderList(tradeRequests, (item) => (
              <>
                🔁 <strong>{item.title}</strong> — From User #{item.poster_id}
              </>
            ))}
          </div>
        );
      case 'purchaseOrders':
        return (
          <div className="main-panel">
            <h2>Purchase Orders</h2>
            {renderList(purchaseOrders, (item) => (
              <>
                💳 <strong>{item.title}</strong> by {item.author} — ${parseFloat(item.price).toFixed(2)}
              </>
            ))}
          </div>
        );
      case 'booksSold':
        return (
          <div className="main-panel">
            <h2>Books Sold</h2>
            {renderList(booksSold, (item) => (
              <>
                💰 <strong>{item.title}</strong> by {item.author} — Sold for ${parseFloat(item.price).toFixed(2)}
              </>
            ))}
          </div>
        );
      default:
        return null;
    }
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
