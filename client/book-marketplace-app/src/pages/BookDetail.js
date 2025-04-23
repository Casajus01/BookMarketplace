import React from 'react';
import './BookDetail.css';

function BookDetail() {
  return (
    <div className="detail-bg">
      <div className="detail-box">
        <h2>Book Title</h2>
        <p><strong>Author:</strong> Jane Austen</p>
        <p><strong>Genre:</strong> Classic Literature</p>
        <p><strong>Condition:</strong> Very Good</p>
        <p><strong>Description:</strong> This is a beautiful, pre-loved copy of Pride & Prejudice...</p>
        <div className="detail-actions">
          <button className="buy-btn">Buy Now</button>
          <button className="trade-btn">Propose Trade</button>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
