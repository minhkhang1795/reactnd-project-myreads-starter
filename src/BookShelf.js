import React, {Component} from 'react';
import BookItem from "./BookItem";

class BookShelf extends Component {

  render() {
    return (
      <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfName}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books && this.props.books.map((book) =>
                <BookItem key={book.id} book={book}/>
              )}
            </ol>
          </div>
      </div>
    )
  }
}

export default BookShelf
