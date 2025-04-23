const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  router.get('/', (req, res) => {
    const sql = `
      SELECT listing_id, poster_id, date_posted, status, type
      FROM listing
      ORDER BY date_posted DESC
    `;
    db.query(sql, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  // POST /listings  body must include:- poster_id: and order type: 'purchase' or 'trade'

  router.post('/', (req, res) => {
    const { poster_id, type } = req.body;

    if (typeof poster_id !== 'number' || !['purchase', 'trade'].includes(type)) {
      return res.status(400).json({ msg: 'poster_id (number) and valid type required' });
    }

    // begin a transaction
    db.beginTransaction(err => {
      if (err) return res.status(500).json({ error: err.message });

      // 1) LISTING (PARENT)
      db.query(
        'INSERT INTO listing (poster_id, type) VALUES (?, ?)',
        [poster_id, type],
        (err, result) => {
          if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

          const listing_id = result.insertId;

          // PURCHASE ORDER
          if (type === 'purchase') {
            const { price, seller_id, buyer_id, book_id, book_condition } = req.body;
            db.query(
              `INSERT INTO purchase_order
                 (listing_id, order_date, price, seller_id, buyer_id, book_id, book_condition)
               VALUES (?, NOW(), ?, ?, ?, ?, ?)`,
              [listing_id, price, seller_id, buyer_id, book_id, book_condition],
              err => {
                if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

                // commit if all good
                db.commit(commitErr => {
                  if (commitErr) return db.rollback(() => res.status(500).json({ error: commitErr.message }));
                  res.status(201).json({ listing_id });
                });
              }
            );

          // TRADE ORDER
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

                // insert each trade_item
                let count = 0;
                for (const { owner_id, book_id, book_condition } of items) {
                  db.query(
                    `INSERT INTO trade_item
                       (listing_id, owner_id, book_id, book_condition)
                     VALUES (?, ?, ?, ?)`,
                    [listing_id, owner_id, book_id, book_condition],
                    err => {
                      if (err) {
                        return db.rollback(() => res.status(500).json({ error: err.message }));
                      }
                      if (++count === items.length) {
                        // last item inserted, commit
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
