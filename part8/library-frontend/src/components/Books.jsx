import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState(['all genres']);
  /*const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
  })*/ // rolling back from GraphQL to local react pre-set genres
  
  const genres = ["IT", "Tech", "Business", "Si-Fi", "crime", "classic", "all genres"]


  if (!show) {
    return null;
  }

  /*if (loading) {
    return <div>Loading...</div>;
  }*/

  //const books = data.allBooks;
  //const genresUniq = [...new Set(books.flatMap((b) => b.genres))];

  /*const handleFilter = (genre) => {
    setFilter(genre);
    refetch({ genre })
  }*/

  const filteredBooks = filter.includes('all genres') 
  ? books 
  : books.filter(book => book.genres.some(genre => filter.includes(genre)))
  return (
    <div>
      <h2>Books</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}

      </div>
    </div>
  );
};

export default Books;
