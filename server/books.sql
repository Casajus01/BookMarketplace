-- book_marketplace schema
CREATE DATABASE IF NOT EXISTS book_marketplace
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE book_marketplace;

--───────────────────────────────────────────────────────────────────────────
CREATE TABLE user (
  user_id   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name      VARCHAR(100)            NOT NULL,
  email     VARCHAR(120)            NOT NULL UNIQUE,
  password  CHAR(60)                NOT NULL,
  role      ENUM('admin','regular') NOT NULL DEFAULT 'regular'
);

CREATE TABLE book (
  book_id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(255) NOT NULL,
  author         VARCHAR(255),
  isbn           VARCHAR(20)  UNIQUE,
  year_published SMALLINT UNSIGNED,
  book_condition ENUM('new','like_new','very_good','good','acceptable'),
  notes          TEXT
);

CREATE TABLE listing (
  listing_id   INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  poster_id    INT UNSIGNED NOT NULL,
  date_posted  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status       ENUM('pending','verified') DEFAULT 'pending',
  type         ENUM('purchase','trade')   NOT NULL,
  FOREIGN KEY (poster_id) REFERENCES user(user_id) ON DELETE CASCADE
);


CREATE TABLE purchase_order (
  listing_id  INT UNSIGNED PRIMARY KEY,
  order_date  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  price       DECIMAL(10,2) NOT NULL,
  seller_id   INT UNSIGNED  NOT NULL,
  buyer_id    INT UNSIGNED  NOT NULL,
  book_id     INT UNSIGNED  NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listing(listing_id) ON DELETE CASCADE,
  FOREIGN KEY (seller_id)  REFERENCES user(user_id),
  FOREIGN KEY (buyer_id)   REFERENCES user(user_id),
  FOREIGN KEY (book_id)    REFERENCES book(book_id)
);


CREATE TABLE trade_order (
  listing_id INT UNSIGNED PRIMARY KEY,
  trade_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listing_id) REFERENCES listing(listing_id) ON DELETE CASCADE
);

CREATE TABLE trade_item (
  trade_item_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  listing_id    INT UNSIGNED NOT NULL,
  owner_id      INT UNSIGNED NOT NULL,
  book_id       INT UNSIGNED NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES trade_order(listing_id) ON DELETE CASCADE,
  FOREIGN KEY (owner_id)   REFERENCES user(user_id),
  FOREIGN KEY (book_id)    REFERENCES book(book_id)
);


CREATE TABLE user_review (
  review_id    INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  reviewer_id  INT UNSIGNED NOT NULL,
  reviewee_id  INT UNSIGNED NOT NULL,
  rating       TINYINT UNSIGNED CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  review_date  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewer_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (reviewee_id) REFERENCES user(user_id) ON DELETE CASCADE
);


CREATE TABLE wishlist (
  wishlist_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     INT UNSIGNED NOT NULL,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE wishlist_item (
  wishlist_id INT UNSIGNED NOT NULL,
  book_id     INT UNSIGNED NOT NULL,
  PRIMARY KEY (wishlist_id, book_id),
  FOREIGN KEY (wishlist_id) REFERENCES wishlist(wishlist_id) ON DELETE CASCADE,
  FOREIGN KEY (book_id)    REFERENCES book(book_id)
);