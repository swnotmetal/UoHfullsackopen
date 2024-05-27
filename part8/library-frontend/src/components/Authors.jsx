import EditAuthor from "./EditAuthor"



const Authors = ({show, authors}) => {

  if (!show) {
    return null
  }

  if (!authors || authors.length === 0) {
    return <div>No authors found</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <EditAuthor />
    </div>
  )
}

export default Authors
