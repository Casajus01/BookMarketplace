import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Wishlist.css';

export default function Wishlist() {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddBook, setShowAddBook] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const user_id = parseInt(localStorage.getItem('user_id'));

  // Fetch all books (for dropdown)
  const fetchBooks = () => {
    fetch('http://localhost:5000/books')
      .then(res => res.json())
      .then(data => {
        const options = data.map(book => ({
          value: book.book_id,
          label: `${book.title} by ${book.author}`
        }));
        setAllBooks(options);
      });
  };

  // Fetch wishlist books
  const fetchWishlist = () => {
    fetch(`http://localhost:5000/wishlist/${user_id}`)
      .then(res => res.json())
      .then(bookIds => {
        // Now get full book info for each
        fetch('http://localhost:5000/books')
          .then(res => res.json())
          .then(all => {
            const filtered = all.filter(b => bookIds.includes(b.book_id));
            setWishlistBooks(filtered);
          });
      });
  };

  useEffect(() => {
    fetchBooks();
    fetchWishlist();
  }, []);

  // Add selected book to wishlist
  const handleAddToWishlist = async () => {
    if (!selectedBook) return alert('Please select a book.');

    try {
      const res = await fetch('http://localhost:5000/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id,
          book_id: selectedBook.value
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Book added to wishlist!');
        fetchWishlist();
      } else {
        alert(data.msg || 'Failed to add');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding book');
    }
  };

  // Add a brand new book
  const handleAddBook = async () => {
    try {
      const res = await fetch('http://localhost:5000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
      });

      const data = await res.json();

      if (res.status === 409) {
        alert('Book already exists!');
        return;
      }

      if (res.ok) {
        const newBook = {
          value: data.book_id,
          label: `${title} by ${author}`
        };
        fetchBooks();
        setSelectedBook(newBook);
        setShowAddBook(false);
        alert('Book added! Now in dropdown.');
      } else {
        alert(data.msg || 'Failed to add book');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Your Wishlist</h2>

        <ul className="wishlist-list">
          {wishlistBooks.map((book) => (
            <li key={book.book_id}>{book.title} by {book.author}</li>
          ))}
          {wishlistBooks.length === 0 && <li>No books in wishlist.</li>}
        </ul>

        <h3>Add a Book to Wishlist</h3>
        <Select
          options={allBooks}
          value={selectedBook}
          onChange={setSelectedBook}
          placeholder="Search for a book..."
          isClearable
        />
        <button onClick={() => setShowAddBook(true)}>Can't find it? Add new book</button>

        {showAddBook && (
          <div style={{ marginTop: '1rem' }}>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <button onClick={handleAddBook}>Submit Book</button>
          </div>
        )}

        <button style={{ marginTop: '1rem' }} onClick={handleAddToWishlist}>
          Add to Wishlist ❤️
        </button>
      </div>
    </div>
  );
}