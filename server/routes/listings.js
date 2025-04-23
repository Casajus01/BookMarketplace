const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // GET /listings - only show verified listings
  router.get('/', (req, res) => {
    const sql = `
      SELECT 
        l.listing_id, 
        l.poster_id, 
        l.date_posted, 
        l.status, 
        l.type,
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

  // GET /listings/all — admin view: shows everything
  router.get('/all', (req, res) => {
    const sql = `
      SELECT 
        l.listing_id, 
        l.poster_id, 
        l.date_posted, 
        l.status, 
        l.type,
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

  // PATCH /listings/:id/verify — admin approval
  router.patch('/:id/verify', (req, res) => {
    const sql = `UPDATE listing SET status = 'verified' WHERE listing_id = ?`;
    db.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ msg: 'Listing verified successfully' });
    });
  });


  // PATCH /purchase/:id
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

  // PATCH /listings/:id/status — update listing status (e.g. to 'sold')
  router.patch('/:id/status', (req, res) => {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'verified', 'sold'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const sql = `UPDATE listing SET status = ? WHERE listing_id = ?`;
    db.query(sql, [status, req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ msg: 'Listing status updated' });
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
