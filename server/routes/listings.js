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
        COALESCE(pb.author, tb.author) AS author
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
    const sql = `UPDATE listing SET status = 'verified' WHERE listing_id = ?`;
    db.query(sql, [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ msg: 'Listing verified successfully' });
    });
  });

  // PATCH /listings/purchase/:id — mark listing sold and set buyer_id
  router.patch('/purchase/:id', (req, res) => {
    const listingId = req.params.id;
    const { buyer_id } = req.body;

    const sql = `
      UPDATE listing l
      JOIN purchase_order po ON l.listing_id = po.listing_id
      SET l.status = 'sold', po.buyer_id = ?
      WHERE l.listing_id = ?;
    `;

    db.query(sql, [buyer_id, listingId], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ msg: 'Listing marked as sold' });
    });
  });

  // ✅ Get books purchased by a user
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

  // ✅ Get books sold by a user
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

  // POST /listings
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
