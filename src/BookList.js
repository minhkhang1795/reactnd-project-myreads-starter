import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import BookShelf from "./BookShelf";

class BookList extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            <BookShelf shelfName={"Currently Reading"}
                       books={this.props.books.filter((book) => book.shelf === "currentlyReading")}
                       onChangeShelf={(book, value) => {this.props.onChangeShelf(book, value)}}/>
            <BookShelf shelfName={"Want To Read"}
                       books={this.props.books.filter((book) => book.shelf === "wantToRead")}
                       onChangeShelf={(book, value) => {this.props.onChangeShelf(book, value)}}/>
            <BookShelf shelfName={"Read"}
                       books={this.props.books.filter((book) => book.shelf === "read")}
                       onChangeShelf={(book, value) => {this.props.onChangeShelf(book, value)}}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
