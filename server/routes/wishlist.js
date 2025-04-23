const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // GET: Get wishlist book_ids for a user
  router.get('/:user_id', (req, res) => {
    const sql = `
      SELECT wi.book_id
      FROM wishlist w
      JOIN wishlist_item wi ON w.wishlist_id = wi.wishlist_id
      WHERE w.user_id = ?
    `;
    db.query(sql, [req.params.user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows.map(r => r.book_id));
    });
  });

  // POST: Add a book to wishlist
  router.post('/', (req, res) => {
    const { user_id, book_id } = req.body;

    const getWishlist = 'SELECT wishlist_id FROM wishlist WHERE user_id = ?';
    const createWishlist = 'INSERT INTO wishlist (user_id, created_at) VALUES (?, NOW())';
    const insertItem = 'INSERT IGNORE INTO wishlist_item (wishlist_id, book_id) VALUES (?, ?)';

    db.query(getWishlist, [user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      const insertBook = (wishlist_id) => {
        db.query(insertItem, [wishlist_id, book_id], (err2) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.status(201).json({ msg: 'Book added to wishlist' });
        });
      };

      if (rows.length > 0) {
        insertBook(rows[0].wishlist_id);
      } else {
        db.query(createWishlist, [user_id], (err2, result) => {
          if (err2) return res.status(500).json({ error: err2.message });
          insertBook(result.insertId);
        });
      }
    });
  });

  return router;
};