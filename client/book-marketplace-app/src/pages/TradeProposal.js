import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TradeProposal.css';

export default function TradeProposal() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user_id = parseInt(localStorage.getItem('user_id'));

  const [myBooks, setMyBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [comment, setComment] = useState('');

  const { listing_id, book_id, title, author, poster_id } = state || {};

  useEffect(() => {
    fetch(`http://localhost:5050/books/owned/${user_id}`)
      .then(res => res.json())
      .then(data => setMyBooks(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Failed to load books:', err);
        setMyBooks([]);
      });
  }, [user_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tradeRequest = {
      listing_id,
      requester_id: user_id,
      receiver_id: poster_id,
      offered_book_id: selectedBookId,
      comment
    };

    fetch('http://localhost:5050/trades/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tradeRequest)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to submit trade');
        return res.json();
      })
      .then(() => {
        alert('✅ Trade request sent!');
        navigate('/my-listings');
      })
      .catch(err => {
        console.error(err);
        alert('❌ Failed to send trade request.');
      });
  };

  if (!listing_id || !poster_id) {
    return (
      <div className="auth-bg">
        <div className="auth-box">
          <h2>Error</h2>
          <p>Listing details not found. Please return to Browse Listings.</p>
          <button onClick={() => navigate('/browse')}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Propose a Trade</h2>
        <p>You're offering a trade for: <strong>{title}</strong> by {author}</p>

        <form onSubmit={handleSubmit}>
          <label>Select one of your books to offer:</label>
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
            required
          >
            <option value="">-- Select a Book --</option>
            {myBooks.map(book => (
              <option key={book.book_id} value={book.book_id}>
                {book.title} by {book.author}
              </option>
            ))}
          </select>

          <label>Optional comment:</label>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a message to the other user..."
          />

          <button type="submit">Send Trade Request</button>
        </form>
      </div>
    </div>
  );
}
