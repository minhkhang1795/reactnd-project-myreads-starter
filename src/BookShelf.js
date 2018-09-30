import React, {Component} from 'react';
import BookItem from "./BookItem";

class BookShelf extends Component {

  render() {
    const {shelfName, books} = this.props;

    return (
      <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfName}</h2>
          <div className="bookshelf-books">
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

export default BookShelf
