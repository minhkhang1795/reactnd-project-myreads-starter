import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
    this.setState({ query: query });
    const ctx = this;
    if (this.timeout)
      clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      BooksAPI.search(query).then(function (books) {
        ctx.setState({
          books: books
        })
      })
    }, WAIT_INTERVAL);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books && this.state.books.map((book) =>
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
