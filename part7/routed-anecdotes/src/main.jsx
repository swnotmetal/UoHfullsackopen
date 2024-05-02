import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { useField } from './hooks'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
  useLocation
} from "react-router-dom"

const Menu = () => {
 
  return (
    <div>
      <br />
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes && anecdotes.map(anecdote => 
      <li key={anecdote.id} >
        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  if (!anecdote) return null

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>Info: {anecdote.info}</p>
      <p>Votes: {anecdote.votes}</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content =  useField('text')
  const author = useField('text')
  const info = useField('text')



  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.field.value,
      author: author.field.value,
      info: info.field.value,
      votes: 0
    })
  }

  const handleReset = (e) =>  {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.field}  />
          <br />
        </div>
        <div>
          author
          <input {...author.field}  />
          <br />
        </div>
        <div>
          url for more info
          <input {...info.field}  />
        </div>
        <button >create</button> <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({notification}) => {

  const style = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    textAlign: 'center',
    display: notification ? 'block' : 'none'
  }

  if (notification === '') return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification( `"${anecdote.content}" has been added` )
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Notification notification={notification} />
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">Menu</Link>
        <Link style={padding} to="/create">Create</Link>
        <Link style={padding} to="/anecdotes">Anecdotes</Link>
        <Link style={padding} to="/about">About</Link>
      </div>
      <Routes>
        <Route path="/" element={<Menu />}/>
        <Route path="/create" element={<CreateNew addNew={addNew} />}/>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />

        <Route path="/about" element={<About />}/>
      </Routes>
      
      <Footer />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)
