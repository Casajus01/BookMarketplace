const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // 🔹 POST /reviews — Submit a new review
  router.post('/', (req, res) => {
    const { reviewer_id, reviewee_id, rating, comment } = req.body;

    if (!reviewer_id || !reviewee_id || !rating) {
      return res.status(400).json({ msg: 'Missing required fields' });
    }

    const sql = `
      INSERT INTO user_review (reviewer_id, reviewee_id, rating, comment, review_date)
      VALUES (?, ?, ?, ?, NOW())
    `;

    db.query(sql, [reviewer_id, reviewee_id, rating, comment], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ msg: 'Review submitted' });
    });
  });

  // 🔹 GET /reviews/:user_id — Fetch all reviews for a specific user
  router.get('/:user_id', (req, res) => {
    const sql = `
      SELECT r.rating, r.comment, r.review_date, u.name AS reviewer_name
      FROM user_review r
      JOIN user u ON r.reviewer_id = u.user_id
      WHERE r.reviewee_id = ?
      ORDER BY r.review_date DESC
    `;

    db.query(sql, [req.params.user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });


  // 🔹 GET /reviews/eligible/:user_id — Get users eligible to be reviewed
  router.get('/eligible/:user_id', (req, res) => {
    const userId = req.params.user_id;

    const sql = `
      (
        SELECT DISTINCT seller_id AS partner_id
        FROM purchase_order
        WHERE buyer_id = ?
      )
      UNION
      (
        SELECT DISTINCT buyer_id AS partner_id
        FROM purchase_order
        WHERE seller_id = ?
      )
      UNION
      (
        SELECT DISTINCT ti2.owner_id AS partner_id
        FROM trade_order t
        JOIN trade_item ti1 ON t.listing_id = ti1.listing_id
        JOIN trade_item ti2 ON t.listing_id = ti2.listing_id
        WHERE ti1.owner_id = ? AND ti2.owner_id != ti1.owner_id
      )
    `;

    db.query(sql, [userId, userId, userId], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows.map(r => r.partner_id));
    });
  });

  // 🔹 GET /reviews/average/:user_id — Get average rating for a user
  router.get('/average/:user_id', (req, res) => {
    const sql = `
      SELECT ROUND(AVG(rating), 2) AS average_rating
      FROM user_review
      WHERE reviewee_id = ?
    `;

    db.query(sql, [req.params.user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows[0]);
    });
  });

  return router;
};
