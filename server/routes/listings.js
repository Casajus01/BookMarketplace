const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // GET /listings - show verified listings only
  router.get('/', (req, res) => {
    const sql = `
      SELECT 
        l.listing_id, l.poster_id, l.date_posted, l.status, l.type,
        CAST(po.price AS DECIMAL(10,2)) AS price,
        COALESCE(po.book_id, ti.book_id) AS book_id,
        COALESCE(pb.title, tb.title) AS title,
        COALESCE(pb.author, tb.author) AS author
      FROM listing l
      LEFT JOIN purchase_order po ON l.listing_id = po.listing_id
      LEFT JOIN trade_item ti ON l.listing_id = ti.listing_id
      LEFT JOIN book pb ON po.book_id = pb.book_id
      LEFT JOIN book tb ON ti.book_id = tb.book_id
      WHERE (pb.book_id IS NOT NULL OR tb.book_id IS NOT NULL)
        AND l.status = 'verified'
      ORDER BY l.date_posted DESC
    `;
    db.query(sql, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // Admin: view all listings
  router.get('/all', (req, res) => {
    const sql = `
      SELECT 
        l.listing_id, l.poster_id, l.date_posted, l.status, l.type,
        CAST(po.price AS DECIMAL(10,2)) AS price,
        COALESCE(po.book_id, ti.book_id) AS book_id,
        COALESCE(pb.title, tb.title) AS title,
        COALESCE(pb.author, tb.author) AS author,
        po.buyer_id, po.seller_id
      FROM listing l
      LEFT JOIN purchase_order po ON l.listing_id = po.listing_id
      LEFT JOIN trade_item ti ON l.listing_id = ti.listing_id
      LEFT JOIN book pb ON po.book_id = pb.book_id
      LEFT JOIN book tb ON ti.book_id = tb.book_id
      WHERE pb.book_id IS NOT NULL OR tb.book_id IS NOT NULL
      ORDER BY l.date_posted DESC
    `;
    db.query(sql, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // PATCH /listings/:id/verify
  router.patch('/:id/verify', (req, res) => {
    db.query(`UPDATE listing SET status = 'verified' WHERE listing_id = ?`, [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ msg: 'Listing verified successfully' });
    });
  });

  // PATCH /listings/purchase/:id — mark listing sold and set buyer_id
  router.patch('/purchase/:id', (req, res) => {
    const { buyer_id } = req.body;
    const sql = `
      UPDATE listing l
      JOIN purchase_order po ON l.listing_id = po.listing_id
      SET l.status = 'sold', po.buyer_id = ?
      WHERE l.listing_id = ?
    `;
    db.query(sql, [buyer_id, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ msg: 'Listing marked as sold' });
    });
  });

  // Get books purchased by a user
  router.get('/purchase-orders/:user_id', (req, res) => {
    const sql = `
      SELECT po.listing_id, po.book_id, po.price, po.order_date, b.title, b.author
      FROM purchase_order po
      JOIN book b ON po.book_id = b.book_id
      WHERE po.buyer_id = ?
      ORDER BY po.order_date DESC
    `;
    db.query(sql, [req.params.user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // Get books sold by a user
  router.get('/books-sold/:user_id', (req, res) => {
    const sql = `
      SELECT po.listing_id, po.book_id, po.price, po.order_date, b.title, b.author
      FROM purchase_order po
      JOIN book b ON po.book_id = b.book_id
      JOIN listing l ON po.listing_id = l.listing_id
      WHERE po.seller_id = ? AND l.status = 'sold'
      ORDER BY po.order_date DESC
    `;
    db.query(sql, [req.params.user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // 🚀 TRADE FEATURE ENDPOINTS

  // POST /listings/trades/request
  router.post('/trades/request', (req, res) => {
    const { listing_id, requester_id, receiver_id, offered_book_id, comment } = req.body;
    const sql = `
      INSERT INTO trade_request (listing_id, requester_id, receiver_id, offered_book_id, comment)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [listing_id, requester_id, receiver_id, offered_book_id, comment], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ msg: 'Trade request submitted', request_id: result.insertId });
    });
  });

  // GET /listings/trades/received/:user_id
  router.get('/trades/received/:user_id', (req, res) => {
    const sql = `
      SELECT tr.*, b.title, b.author
      FROM trade_request tr
      JOIN book b ON tr.offered_book_id = b.book_id
      WHERE tr.receiver_id = ?
      ORDER BY tr.request_date DESC
    `;
    db.query(sql, [req.params.user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // GET /listings/trades/sent/:user_id
  router.get('/trades/sent/:user_id', (req, res) => {
    const sql = `
      SELECT tr.*, b.title, b.author
      FROM trade_request tr
      JOIN book b ON tr.offered_book_id = b.book_id
      WHERE tr.requester_id = ?
      ORDER BY tr.request_date DESC
    `;
    db.query(sql, [req.params.user_id], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // PATCH /listings/trades/:id/respond
  router.patch('/trades/:id/respond', (req, res) => {
    const { status } = req.body;
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }
    const sql = `UPDATE trade_request SET status = ? WHERE request_id = ?`;
    db.query(sql, [status, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ msg: `Trade request ${status}` });
    });
  });

  // POST /listings — Create new listing
  router.post('/', (req, res) => {
    const { poster_id, type } = req.body;
    if (typeof poster_id !== 'number' || !['purchase', 'trade'].includes(type)) {
      return res.status(400).json({ msg: 'poster_id (number) and valid type required' });
    }

    db.beginTransaction(err => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(
        'INSERT INTO listing (poster_id, type) VALUES (?, ?)',
        [poster_id, type],
        (err, result) => {
          if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

          const listing_id = result.insertId;

          if (type === 'purchase') {
            const { price, seller_id, buyer_id, book_id, book_condition } = req.body;
            db.query(
              `INSERT INTO purchase_order
                (listing_id, order_date, price, seller_id, buyer_id, book_id, book_condition)
              VALUES (?, NOW(), ?, ?, ?, ?, ?)`,
              [listing_id, price, seller_id, buyer_id, book_id, book_condition],
              err => {
                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                db.commit(commitErr => {
                  if (commitErr) return db.rollback(() => res.status(500).json({ error: commitErr.message }));
                  res.status(201).json({ listing_id });
                });
              }
            );
          } else {
            db.query(
              'INSERT INTO trade_order (listing_id, trade_date) VALUES (?, NOW())',
              [listing_id],
              err => {
                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

                const items = Array.isArray(req.body.items) ? req.body.items : [];
                if (items.length === 0) {
                  return db.commit(cErr => {
                    if (cErr) return db.rollback(() => res.status(500).json({ error: cErr.message }));
                    res.status(201).json({ listing_id });
                  });
                }

                let count = 0;
                for (const { owner_id, book_id, book_condition } of items) {
                  db.query(
                    `INSERT INTO trade_item (listing_id, owner_id, book_id, book_condition)
                    VALUES (?, ?, ?, ?)`,
                    [listing_id, owner_id, book_id, book_condition],
                    err => {
                      if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
                      if (++count === items.length) {
                        db.commit(cErr => {
                          if (cErr) return db.rollback(() => res.status(500).json({ error: cErr.message }));
                          res.status(201).json({ listing_id });
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  });

  return router;
};
