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
    const { title, author } = req.body;
  
    if (!title || !author) {
      return res.status(400).json({ msg: 'Title and author are required' });
    }
  
    // Check for duplicate title
    const checkSql = 'SELECT * FROM book WHERE title = ?';
    db.query(checkSql, [title], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (rows.length > 0) {
        return res.status(409).json({ msg: 'A book with this title already exists' });
      }
  
      // No duplicate, insert the book
      const insertSql = 'INSERT INTO book (title, author) VALUES (?, ?)';
      db.query(insertSql, [title, author], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ book_id: result.insertId });
      });
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
