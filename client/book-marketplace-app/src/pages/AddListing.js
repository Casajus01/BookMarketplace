import React, { useState, useEffect } from 'react';
import './AddListing.css';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function AddListing() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddBook, setShowAddBook] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');
  const [notesRequired, setNotesRequired] = useState(false);
  const [bookCondition, setBookCondition] = useState('Good');

  const navigate = useNavigate();
  const poster_id = parseInt(localStorage.getItem('user_id'));

  const fetchBooks = () => {
    fetch('http://localhost:5050/books')
      .then(res => res.json())
      .then(data => {
        const options = data.map(book => ({
          value: book.book_id,
          label: `${book.title} by ${book.author}`
        }));
        setBooks(options);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBook) {
      return alert('Please select a book or add a new one.');
    }

    if (type === 'purchase' && !price) {
      return alert('Please enter a price for a purchase listing.');
    }

    if (type === 'trade' && !notes.trim()) {
      return alert('Please describe what you want to trade for.');
    }

    try {
      const res = await fetch('http://localhost:5050/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          poster_id,
          type,
          price: type === 'purchase' ? parseFloat(price) : null,
          seller_id: type === 'purchase' ? poster_id : null,
          buyer_id: null,
          book_id: selectedBook.value,
          book_condition: bookCondition,
          notes,
          items: type === 'trade'
            ? [{
                owner_id: poster_id,
                book_id: selectedBook.value,
                book_condition: bookCondition
              }]
            : []
        })        
      });

      const data = await res.json();
      console.log('Backend response:', data); // 👈 Add this
      if (res.ok) {
        alert('Listing created!');
        navigate('/browse');
      } else {
        alert(data.msg || 'Listing creation failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  const handleAddBook = async () => {
    try {
      const res = await fetch('http://localhost:5050/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
      });

      const data = await res.json();

      if (res.status === 409) {
        alert('A book with that title already exists.');
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
        alert('Book submitted!');
      } else {
        alert(data.msg || 'Failed to add book');
      }
    } catch (err) {
      console.error(err);
      alert('Error adding book');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-box">
        <h2>Add a New Listing</h2>
        <form onSubmit={handleSubmit}>
          <label>Search or Select Book</label>
          <Select
            options={books}
            value={selectedBook}
            onChange={setSelectedBook}
            placeholder="Search for a book..."
            isClearable
          />
          <button type="button" onClick={() => setShowAddBook(true)}>
            Can't find it? Add a new book
          </button>

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
              <button type="button" onClick={handleAddBook}>
                Submit Book
              </button>
            </div>
          )}

          <select
            value={type}
            onChange={(e) => {
              const selected = e.target.value;
              setType(selected);
              if (selected === 'purchase') {
                setNotesRequired(false);
              } else if (selected === 'trade') {
                setNotesRequired(true);
                setPrice('');
              }
            }}
            required
          >
            <option value="">Select Listing Type</option>
            <option value="purchase">Purchase</option>
            <option value="trade">Trade</option>
          </select>

          <label>Book Condition</label>
          <select
            value={bookCondition}
            onChange={(e) => setBookCondition(e.target.value)}
            required
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>

          {type === 'purchase' && (
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          )}

          <textarea
            placeholder={type === 'trade' ? "Book(s) you're looking to trade for" : "Notes or Description"}
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required={notesRequired}
          />

          <button type="submit">Submit Listing</button>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
