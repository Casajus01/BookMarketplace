import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BrowseListings.css';

export default function BrowseListings() {
  const [listings, setListings] = useState([]);
  const [books, setBooks] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState('all'); // all | purchase | trade | wishlist

  const navigate = useNavigate();
  const user_id = parseInt(localStorage.getItem('user_id'));

  useEffect(() => {
    fetch('http://localhost:5050/listings')
      .then(res => res.json())
      .then(setListings)
      .catch(console.error);

    fetch('http://localhost:5050/books')
      .then(res => res.json())
      .then(setBooks)
      .catch(console.error);

    fetch(`http://localhost:5000/wishlist/${user_id}`)
      .then(res => res.json())
      .then(setWishlist)
      .catch(console.error);
  }, [user_id]);

  const getBook = (book_id) => books.find(b => b.book_id === book_id) || {};

  const filteredListings = listings
    .filter(listing => listing.poster_id !== user_id) // ❌ Don't show user's own listings
    .filter(listing => {
      if (filter === 'wishlist') return wishlist.includes(listing.book_id);
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
          <button className={filter === 'wishlist' ? 'active' : ''} onClick={() => setFilter('wishlist')}>Wishlist ❤️</button>
        </div>
      </div>

      <div className="listing-grid">
        {filteredListings.map(listing => {
          const book = getBook(listing.book_id);
          const isTrade = listing.type === 'trade';
          const isFavorited = wishlist.includes(listing.book_id);
          const label = isTrade ? 'Request Trade' : 'Purchase Now';

          return (
            <div className="listing-card" key={listing.listing_id}>
              <div className="placeholder-icon">
                📚 {isFavorited && <span style={{ color: 'red' }}>❤️</span>}
              </div>
              <h3>{book.title || 'Untitled Book'}</h3>
              <div className="listing-meta">
                <p><strong>Author:</strong> {book.author || 'Unknown'}</p>
                <p><strong>Type:</strong> {listing.type}</p>
                <p><strong>Status:</strong> {listing.status}</p>
                {!isTrade && (
                  <p>
                    <strong>Price:</strong>{' '}
                    {listing.price != null
                      ? `$${parseFloat(listing.price).toFixed(2)}`
                      : 'N/A'}
                  </p>
                )}
              </div>
              <button onClick={() => navigate(`/book/${listing.listing_id}`)}>
                {label}
              </button>
            </div>
          );
        })}

        {filteredListings.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>No listings found.</p>
        )}
      </div>
    </div>
  );
}
