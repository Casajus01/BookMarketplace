import React from 'react';
import './AddListing.css';

function AddListing() {
  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Add a New Listing</h2>
        <form>
          <input type="text" placeholder="Book Title" required />
          <input type="text" placeholder="Author" required />
          <input type="text" placeholder="Genre" />
          <select required>
            <option value="">Select Listing Type</option>
            <option value="purchase">Purchase</option>
            <option value="trade">Trade</option>
          </select>
          <input type="number" placeholder="Price (only if for sale)" />
          <textarea placeholder="Notes or Description" rows={4}></textarea>

          <button type="submit">Submit Listing</button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
