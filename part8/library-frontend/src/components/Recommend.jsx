import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { USER, ALL_BOOKS } from '../queries';

/*const Recommend = (props) => {
  const { data: userData, loading: userLoading, error: userError } = useQuery(USER);
  const [genre, setGenre] = useState(null);
  const [books, setBooks] = useState([]);
  const [getBooks, { loading: booksLoading, error: booksError, data: booksData }] = useLazyQuery(ALL_BOOKS);

  useEffect(() => {
    if (userData && !userLoading) {
      console.log('User Data:', userData);
      setGenre(userData.me.favoriteGenre);
    }
    if (userError) {
      console.error('User Query Error:', userError);
    }
  }, [userLoading, userData, userError]);

  useEffect(() => {
    if (genre) {
      console.log('Fetching books for genre:', genre);
      getBooks({ variables: { genre } });
    }
  }, [genre, getBooks]);

  useEffect(() => {
    if (booksData && booksData.allBooks) {
      console.log('Books Data:', booksData.allBooks);
      setBooks(booksData.allBooks);
    }
    if (booksError) {
      console.error('Books Query Error:', booksError);
    }
  }, [booksData, booksError]);

  if (userLoading || booksLoading) {
    return <div>Loading...</div>;
  }

  if (userError || booksError) {
    return (
      <div>
        <h2>Error</h2>
        <p>{userError ? userError.message : booksError.message}</p>
      </div>
    );
  }

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre: {genre}</p>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend*/
//rolling back to 8.19-20 with local react instead of GraphSL


const Recommend = ({ show, favoriteGenre = ['all genres'], books }) => {
  if (!show) {
      return null
  }

  const filteredBooks = favoriteGenre.includes('all genres')
    ? books
    : books.filter(book => book.genres.some(genre => favoriteGenre.includes(genre)))

  return (
      <div>
          <h2>Recommendations</h2>
          <p>Books in your favorite genre: {favoriteGenre}</p>
          <table>
              <tbody>
                  <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Published</th>
                  </tr>
                  {filteredBooks.map((book) => (
                      <tr key={book.title}>
                          <td>{book.title}</td>
                          <td>{book.author.name}</td>
                          <td>{book.published}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  )
}
//favgenre in db is automatically seen as an array, fix it
export default Recommend

