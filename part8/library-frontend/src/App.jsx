import { useState } from "react";
import { useQuery } from '@apollo/client'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_BOOKS, ALL_AUTHORS } from "./queries";

const App = () => {
  const resultAuthors = useQuery(ALL_AUTHORS ,{
    pollInterval: 2000
  })
  const resultBooks = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
  const [page, setPage] = useState("authors");

  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (resultBooks.loading || resultAuthors.loading) {
    return <div>loading...</div>
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={resultAuthors.data.allAuthors} />

      <Books show={page === "books"} books={resultBooks.data.allBooks} />

      <NewBook show={page === "add"} setError={notify} />
    </div>
  );
};

export default App;
