import React from 'react';
import './PurchaseConfirmation.css';

function PurchaseConfirmation() {
  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Purchase Confirmed!</h2>
        <p>Thank you for your purchase. The seller has been notified and will contact you shortly.</p>
        <a href="/browse">
          <button>Back to Listings</button>
        </a>
      </div>
    </div>
  );
}

export default PurchaseConfirmation;
