const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // GET /books
  router.get('/', (req, res) => {
    db.query('SELECT * FROM book', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  //Add a new book
  router.post('/', (req, res) => {
    const { title, author, isbn } = req.body;
    if (!title || !author) {
      return res.status(400).json({ msg: 'Title and author are required' });
    }

    const sql = 'INSERT INTO book (title, author,isbn) VALUES (?, ?, ?)';
    db.query(sql, [title, author, isbn], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ book_id: result.insertId });
    });
  });

  router.patch('/:id', (req, res) => {
    const { isbn } = req.body;
    const { id } = req.params;
  
    if (!isbn) return res.status(400).json({ msg: 'ISBN is required' });
  
    const sql = 'UPDATE book SET isbn = ? WHERE book_id = ?';
    db.query(sql, [isbn, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ msg: 'Book not found' });
      res.json({ msg: 'ISBN updated' });
    });
  });


  return router;
};
