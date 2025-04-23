const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const JWT_SECRET = '471secret';

module.exports = (db) => {
  const router = express.Router();


  router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    db.query('SELECT 1 FROM user WHERE email=?', [email], async (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length) return res.status(409).json({ msg: 'Email in use' });

      const hash = await bcrypt.hash(password, 10);
      db.query(
        'INSERT INTO user (name,email,password) VALUES (?,?,?)',
        [name, email, hash],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ msg: 'Account created' });
        }
      );
    });
  });


  router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM user WHERE email=?', [email], async (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!rows.length) return res.status(401).json({ msg: 'Bad creds' });

      const user  = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ msg: 'Bad creds' });

      const token = jwt.sign(
        { user_id: user.user_id, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: '2h' }
      );
      res.json({ token, user_id: user.user_id });
    });
  });

  return router;
};
