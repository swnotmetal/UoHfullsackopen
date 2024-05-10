import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import Notify from './Notify'

const NewBook = ({show, setError}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [errorMessage] = useState(null)
  const [ createBook ] = useMutation(CREATE_BOOK,{
    refetchQueries: [{ query:ALL_BOOKS }, { query:ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message
      setError(messages)
      console.log('error', error)
    },
    update: (cache, { data: { createBook } }) => {
      const { allBooks } = cache.readQuery({ query: ALL_BOOKS });
      cache.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: allBooks.concat([createBook]) },
      });
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    createBook({ variables: { title, author, published: parseInt(published), genres } })
  .then(response => {
    console.log(response)
  })  


    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook