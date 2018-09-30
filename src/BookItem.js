import React, { Component } from 'react';

class BookItem extends Component {

  changeShelf(book, value) {
    this.props.onChangeShelf(book, value);
  }

  render() {
    const { book } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail.replace("http","https") : ''})`
            }}/>
            <div className="book-shelf-changer">
              <select value={book.shelf ? book.shelf : "none"} onChange={(e) => this.changeShelf(book, e.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }

}

export default BookItem
