import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from "./BookSearch";
import BookList from "./BookList";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getCurrentBooks();
  }

  getCurrentBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
  }

  onChangeShelf(book, value) {
    let ctx = this;
    BooksAPI.update(book, value).then(() => {
      ctx.getCurrentBooks();
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList
            books={this.state.books}
            onChangeShelf={(book, value) => {
              this.onChangeShelf(book, value)
            }}
          />
        )}/>
        <Route path='/search' render={() => (
          <BookSearch
            currentBooks={this.state.books}
            onChangeShelf={(book, value) => {
              this.onChangeShelf(book, value)
            }}
          />
        )}/>
      </div>
    )
  }

}

export default BooksApp
