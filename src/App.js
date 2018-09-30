import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from "./BookSearch";
import BookList from "./BookList";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList
            books={this.state.books}
          />
        )}/>
        <Route path='/search' render={() => (
          <BookSearch/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
