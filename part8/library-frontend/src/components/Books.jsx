import { useState } from "react";

const Books = ({ show, books }) => {
  if (!show) {
    return null;
  }

  const [genreFilter, setGenreFilter] = useState(null);

  const handleFilter = (genre) => {
    setGenreFilter(genre);
  };

  // Extract unique genres from the books array
  const genresUniq = [...new Set(books.flatMap(b => b.genres))];

  // Filter books based on the selected genre
  const filteredBooks = genreFilter
    ? books.filter(b => b.genres.includes(genreFilter))
    : books;

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
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Filter by genre</h3>
        {genresUniq.map((genre) => (
          <button key={genre} onClick={() => handleFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenreFilter(null)}>All</button>
      </div>
    </div>
  );
};

export default Books;
