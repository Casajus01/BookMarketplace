import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrowseListings.css';

export default function BrowseListings() {
  const [listings, setListings] = useState([]);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('all'); // all | purchase | trade
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/listings')
      .then(res => res.json())
      .then(setListings)
      .catch(console.error);

    fetch('http://localhost:5000/books')
      .then(res => res.json())
      .then(setBooks)
      .catch(console.error);
  }, []);

  const getBook = (book_id) => books.find(b => b.book_id === book_id) || {};

  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true;
    return listing.type === filter;
  });

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h2>Marketplace Listings</h2>
        <div className="filter-buttons">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
          <button className={filter === 'purchase' ? 'active' : ''} onClick={() => setFilter('purchase')}>Purchase</button>
          <button className={filter === 'trade' ? 'active' : ''} onClick={() => setFilter('trade')}>Trade</button>
        </div>
      </div>

      <div className="listing-grid">
        {filteredListings.map(listing => {
          const book = getBook(listing.book_id);
          const isTrade = listing.type === 'trade';
          const label = isTrade ? 'Request Trade' : 'Purchase Now';

          return (
            <div className="listing-card" key={listing.listing_id}>
              <div className="placeholder-icon">📚</div>
              <h3>{book.title || 'Untitled Book'}</h3>
              <div className="listing-meta">
                <p><strong>Author:</strong> {book.author || 'Unknown'}</p>
                <p><strong>Type:</strong> {listing.type}</p>
                <p><strong>Status:</strong> {listing.status}</p>
                {!isTrade && <p>
                <strong>Price:</strong>{' '}
                {listing.type === 'purchase' && listing.price != null
                  ? `$${parseFloat(listing.price).toFixed(2)}`
                  : 'N/A'}
              </p>
              }
              </div>
              <button onClick={() => navigate(`/book/${listing.listing_id}`)}>
                {label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
