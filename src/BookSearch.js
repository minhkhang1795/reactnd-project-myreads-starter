import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookItem from "./BookItem";

const WAIT_INTERVAL = 1000;

class BookSearch extends Component {

  state = {
    query: '',
    books: []
  };

  timeout = 0;

  updateQuery = (query) => {
    this.setState({query: query});
    const ctx = this;

    if (this.timeout)
      clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      BooksAPI.search(query).then(function (books) {
        // Check book ids to set their valid shelf
        if (books && books.constructor === Array) {
          if (ctx.props.currentBooks && ctx.props.currentBooks.constructor === Array) {
            for (let i = 0; i < books.length; i++) {
              for (let j = 0; j < ctx.props.currentBooks.length; j++) {
                if (ctx.props.currentBooks[j].id === books[i].id) {
                  books[i].shelf = ctx.props.currentBooks[j].shelf;
                }
              }
            }
          }
        }

        // Update state
        ctx.setState({
          books: books
        })
      })
    }, WAIT_INTERVAL);
  };

  static getDerivedStateFromProps(newProps, prevState) {
    const books = prevState.books;
    const currentBooks = newProps.currentBooks;
    // Check book ids to set their valid shelf
    if (books && books.constructor === Array) {
      if (currentBooks && currentBooks.constructor === Array) {
        for (let i = 0; i < books.length; i++) {
          for (let j = 0; j < currentBooks.length; j++) {
            if (currentBooks[j].id === books[i].id) {
              books[i].shelf = currentBooks[j].shelf;
            }
          }
        }
      }
    }

    return {books: books};
  }

  render() {
    const {query, books} = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {books && books.constructor === Array && books.map((book) =>
              <BookItem key={book.id} book={book} onChangeShelf={(book, value) => {
                this.props.onChangeShelf(book, value)
              }}/>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch
