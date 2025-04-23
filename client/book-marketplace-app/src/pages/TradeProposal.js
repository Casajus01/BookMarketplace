import React, { useState } from 'react';
import './TradeProposal.css';

function TradeProposal() {
  const [selectedBook, setSelectedBook] = useState("");

  const handleTradeSubmit = (e) => {
    e.preventDefault();
    alert(`Trade request sent for book: ${selectedBook}`);
  };

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Propose a Trade</h2>
        <form onSubmit={handleTradeSubmit}>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            required
          >
            <option value="">Select one of your books</option>
            <option value="book1">The Alchemist</option>
            <option value="book2">Atomic Habits</option>
            <option value="book3">1984</option>
          </select>

          <button type="submit">Send Trade Request</button>
        </form>
      </div>
    </div>
  );
}

export default TradeProposal;
