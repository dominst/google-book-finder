import React, { useState } from "react";

import { BookRecord } from "./components/BookRecord";

import "./App.css";

export default function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [noRecord, setNoRecord] = useState(false);

  const isDisabled = !(title.trim() || author.trim() || isbn.trim());

  async function fetchBooks() {
    try {
      const response = await fetch(getFetchPath(title, author, isbn));
      const data = await response.json();
      if (data.totalItems) {
        setNoRecord(false);
        setBooks(data.items);
      } else {
        setNoRecord(true);
        setBooks([]);
      }
    } catch (err) {
      throw new Error("Something went wrong.");
    }
  }

  const handleKeyPress = (target) => {
    if (target.charCode === 13) {
      fetchBooks();
    }
  };

  return (
    <div>
      <div className="search_bar">
        <h3>
          Book finder -&nbsp;
          <a href="https://www.github.com" target="blank">
            source code
          </a>
        </h3>
        <div>
          <input
            type="text"
            value={title}
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="input_fields"
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            value={author}
            name="author"
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
            className="input_fields"
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            value={isbn}
            name="isbn"
            placeholder="ISBN"
            onChange={(e) => setIsbn(e.target.value)}
            className="input_fields"
            onKeyPress={handleKeyPress}
          />
        </div>
        <span>
          <button
            onClick={fetchBooks}
            className="find_button"
            disabled={isDisabled}
            title={isDisabled ? "Please fill the inputs" : undefined}
          >
            Find books
          </button>
        </span>
      </div>
      {
        <div className="books_list">
          <div className="bookrecords">
            {books.map((book) => {
              return (
                <BookRecord
                  key={book.id}
                  imageLinks={book.volumeInfo.imageLinks}
                  title={book.volumeInfo.title}
                  description={book.volumeInfo.description}
                />
              );
            })}
          </div>
        </div>
      }
      {noRecord && <p className="alert_message">No record found.</p>}
    </div>
  );
}

const getFetchPath = (title, author, isbn) => {
  let path = "https://www.googleapis.com/books/v1/volumes?q=";

  if (title) path += title;
  if (author) path += `+inauthor:${author}`;
  if (isbn) path += `+isbn:${isbn}`;
  return `${path}&maxResults=40`;
};
