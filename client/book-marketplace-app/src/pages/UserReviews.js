import React, { useState, useEffect } from 'react';
import './UserReviews.css';

export default function UserReviews() {
  const user_id = parseInt(localStorage.getItem('user_id'));
  const [writtenReviews, setWrittenReviews] = useState([]);
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  const [revieweeId, setRevieweeId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/reviews/${user_id}`)
      .then(res => res.json())
      .then(setReceivedReviews)
      .catch(console.error);

    fetch(`http://localhost:5000/reviews/written/${user_id}`)
      .then(res => res.json())
      .then(setWrittenReviews)
      .catch(console.error);

    fetch(`http://localhost:5000/reviews/eligible/${user_id}`)
      .then(res => res.json())
      .then(ids => {
        setEligibleUsers(ids);
        fetch('http://localhost:5000/users')
          .then(res => res.json())
          .then(users => {
            const options = users.filter(u => ids.includes(u.user_id));
            setUserOptions(options);
          });
      })
      .catch(console.error);
  }, [user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!revieweeId) return alert('Please select a user to review.');

    try {
      const res = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewer_id: user_id,
          reviewee_id: revieweeId,
          rating,
          comment
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Review submitted!');
        setRating(5);
        setComment('');
        setRevieweeId('');
      } else {
        alert(data.msg || 'Failed to submit review.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting review.');
    }
  };

  const renderStars = (num) => '⭐'.repeat(num);

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>User Reviews</h2>

        <section className="reviews-section">
          <h3>Reviews You Wrote</h3>
          {writtenReviews.length === 0 ? <p>No reviews written.</p> :
            <ul className="review-list">
              {writtenReviews.map((r, i) => (
                <li key={i}>
                  <strong>You rated {r.reviewee_name}</strong> — {renderStars(r.rating)}<br />
                  <em>{r.comment}</em> <span className="date">({new Date(r.review_date).toLocaleDateString()})</span>
                </li>
              ))}
            </ul>
          }
        </section>

        <section className="reviews-section">
          <h3>Reviews You Received</h3>
          {receivedReviews.length === 0 ? <p>No reviews received.</p> :
            <ul className="review-list">
              {receivedReviews.map((r, i) => (
                <li key={i}>
                  <strong>{r.reviewer_name}</strong> rated you — {renderStars(r.rating)}<br />
                  <em>{r.comment}</em> <span className="date">({new Date(r.review_date).toLocaleDateString()})</span>
                </li>
              ))}
            </ul>
          }
        </section>

        <section className="reviews-section">
          <h3>Leave a Review</h3>
          <form onSubmit={handleSubmit} className="review-form">
            <select value={revieweeId} onChange={(e) => setRevieweeId(e.target.value)} required>
              <option value="">Select user to review</option>
              {userOptions.map(u => (
                <option key={u.user_id} value={u.user_id}>{u.name}</option>
              ))}
            </select>

            <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{renderStars(num)}</option>
              ))}
            </select>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Write your feedback here..."
              required
            />

            <button type="submit">Submit Review</button>
          </form>
        </section>
      </div>
    </div>
  );
}