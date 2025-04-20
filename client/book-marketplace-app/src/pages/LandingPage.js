import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-bg">
      <div className="landing-container">
        <h1>Welcome to Book Marketplace</h1>
        <p className="tagline">
          Buy, sell, and <strong>trade</strong> books — sustainably and affordably.
        </p>

        <div className="features">
          <div className="feature-card">
            📚
            <h3>Eco-Friendly Reading</h3>
            <p>
              Support sustainability by reusing and redistributing books you love.
            </p>
          </div>
          <div className="feature-card">
            🤝
            <h3>Trade with Readers</h3>
            <p>
              Exchange books with fellow students and book lovers — no money needed!
            </p>
          </div>
          <div className="feature-card">
            💸
            <h3>Buy & Sell Easily</h3>
            <p>
              Post your listings, find great deals, and make the most of every book.
            </p>
          </div>
        </div>

        <div className="landing-buttons">
          <button className="primary-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
          <button className="secondary-btn" onClick={() => navigate("/signup")}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
