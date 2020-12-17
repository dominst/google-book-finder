import React, { useState } from "react";

import { BookRecord } from "./components/BookRecord";

import "./BookApp.css";

interface Book {
  id: string;
  volumeInfo: {
    imageLinks: { thumbnail: string };
    title: string;
    description: string;
  };
}

export default function BookApp() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTermTitle, setTitle] = useState("");
  const [searchTermAuthor, setAuthor] = useState("");
  const [searchTermIsbn, setIsbn] = useState("");

  const [notFoundError, setNotFoundError] = useState(false);

  const isFindButonActive = !(
    searchTermTitle.trim() ||
    searchTermAuthor.trim() ||
    searchTermIsbn.trim()
  );

  const onSearchButtonClick = async () => {
    const books = await getAllBooks(
      searchTermTitle,
      searchTermAuthor,
      searchTermIsbn
    );

    if (books.totalItems) {
      setNotFoundError(false);
      setBooks(books.items);
    } else {
      setNotFoundError(true);
      setBooks([]);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") onSearchButtonClick();
  };

  return (
    <div className="search_app">
      <div className="search_bar">
        <h3>
          Book finder -&nbsp;
          <a
            href="https://github.com/dominst/google-book-finder"
            target="blank"
          >
            source code
          </a>
        </h3>
        <div>
          <input
            type="text"
            value={searchTermTitle}
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="input_fields"
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            value={searchTermAuthor}
            name="author"
            placeholder="Author"
            onChange={(e) => setAuthor(e.target.value)}
            className="input_fields"
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            value={searchTermIsbn}
            name="isbn"
            placeholder="ISBN"
            onChange={(e) => setIsbn(e.target.value)}
            className="input_fields"
            onKeyPress={handleKeyPress}
          />
        </div>
        <span>
          <button
            onClick={onSearchButtonClick}
            className="find_button"
            disabled={isFindButonActive}
            title={isFindButonActive ? "Please fill the inputs" : undefined}
          >
            Find books
          </button>
        </span>
        <BookList books={books} />
      </div>

      {notFoundError && <p className="alert_message">No record found.</p>}
    </div>
  );
}

const BookList = ({ books }: { books: Book[] }) => {
  return (
    <div className="books_list">
      <div className="bookrecords">
        {books.map((book: Book) => {
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
  );
};

async function getAllBooks(
  title: string,
  author: string,
  isbn: string
): Promise<{ totalItems: number; items: Book[] }> {
  let path = "https://www.googleapis.com/books/v1/volumes?q=";

  if (title) path += title;
  if (author) path += `+inauthor:${author}`;
  if (isbn) path += `+isbn:${isbn}`;

  try {
    const response = await fetch(`${path}&maxResults=40`);
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Something went wrong.");
  }
}
