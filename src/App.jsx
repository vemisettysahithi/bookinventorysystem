import React, { useState, useEffect } from 'react';

    function App() {
      const [books, setBooks] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [newBook, setNewBook] = useState({ title: '', author: '', price: '' });

      useEffect(() => {
        async function fetchBooks() {
          try {
            const simulatedData = [
              { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', price: 25.00 },
              { title: 'Pride and Prejudice', author: 'Jane Austen', price: 15.00 },
              { title: '1984', author: 'George Orwell', price: 18.00 },
              { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 20.00 },
              { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 17.00 },
            ];
            await new Promise(resolve => setTimeout(resolve, 1000));
            setBooks(simulatedData);
          } catch (err) {
            setError(err.message || 'Failed to fetch books');
          } finally {
            setLoading(false);
          }
        }

        fetchBooks();
      }, []);

      const handleInputChange = (e) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
      };

      const handleAddBook = () => {
        if (newBook.title && newBook.author && newBook.price) {
          const price = parseFloat(newBook.price);
          if (!isNaN(price)) {
            setBooks([...books, { ...newBook, price }]);
            setNewBook({ title: '', author: '', price: '' });
          } else {
            alert('Please enter a valid price.');
          }
        } else {
          alert('Please fill in all fields.');
        }
      };

      if (loading) {
        return <div>Loading books...</div>;
      }

      if (error) {
        return <div>Error: {error}</div>;
      }

      return (
        <div>
          <h1>Book Inventory</h1>

          <div>
            <h2>Add New Book</h2>
            <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleInputChange} />
            <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleInputChange} />
            <input type="number" name="price" placeholder="Price" value={newBook.price} onChange={handleInputChange} />
            <button onClick={handleAddBook}>Add Book</button>
          </div>

          <h2>Book List</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>${book.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    export default App;
