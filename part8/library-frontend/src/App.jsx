import { useState } from "react";
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_BOOKS, ALL_AUTHORS } from "./queries";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";

const App = () => {

  const [token, setToken ] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const resultAuthors = useQuery(ALL_AUTHORS ,{
    pollInterval: 2000
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const [page, setPage] = useState("authors");
  const client = useApolloClient()

  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (resultBooks.loading || resultAuthors.loading) {
    return <div>loading...</div>
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  console.log('authors', resultAuthors.data.allAuthors)
  console.log('books', resultBooks.data.allBooks)
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} authors={resultAuthors.data.allAuthors} />
    
      <Books show={page === "books"} books={resultBooks.data.allBooks} />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
