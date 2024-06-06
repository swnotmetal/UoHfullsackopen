import React, { useState } from "react";
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend"

import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import { ALL_AUTHORS, ALL_BOOKS, USER, BOOK_ADDED } from "./queries";


export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}
const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const user = useQuery(USER)
  //const books = useQuery(ALL_BOOKS)
  //const authors = useQuery(ALL_AUTHORS)
  const resultAuthors = useQuery(ALL_AUTHORS ,{
    pollInterval: 2000
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} by ${addedBook.author.name} is added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.clearStore();
  };

  if (resultBooks.loading || resultAuthors.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  console.log('authors', resultAuthors.data.allAuthors)
  console.log('books', resultBooks.data.allBooks)
  console.log("User Data:", user)
  console.log("fav:",user.data.me.favoriteGenre)
  const favoriteGenre = user.data.me.favoriteGenre

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} authors={resultAuthors.data.allAuthors} />
      <Books show={page === "books" } books={resultBooks.data.allBooks}/>
      <Recommend show={page === "recommend"} favoriteGenre={favoriteGenre} books={resultBooks.data.allBooks} />
      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
