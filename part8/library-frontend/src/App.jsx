import React, { useState } from "react";
import { useApolloClient, useQuery } from '@apollo/client';
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend"

import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import { ALL_AUTHORS, ALL_BOOKS, USER } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();
  const [page, setPage] = useState("authors");
  const user = useQuery(USER)
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)
  //const { loading: loadingAuthors, data: dataAuthors } = useQuery(ALL_AUTHORS);
  /*const { loading: loadingBooks, data: dataBooks } = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  })*/

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

  if (authors.loading|| books.loading) {
    return <div>loading...</div>;
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
  console.log("User Data:", user)
  console.log("fav:",user.data.me.favoriteGenre)
  const favoriteGenre = user.data.me.favoriteGenre || 'all genres';

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} authors={authors.data.allAuthors} />
      <Books show={page === "books" } books={books.data.allBooks}/>
      <Recommend show={page === "recommend"} favoriteGenre={favoriteGenre} books={books.data.allBooks} />
      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
