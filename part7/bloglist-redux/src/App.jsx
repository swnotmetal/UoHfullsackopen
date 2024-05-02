import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { createBlogs,initialBlogs } from './reducers/blogReducer'
import { useSelector } from 'react-redux'
import { initialUsersAll } from './reducers/userReducer'
import { logIn, logOut, userInitial } from './reducers/authenReducer'
import { BrowserRouter as Router, Routes, Route, Link, redirect as Redirect} from 'react-router-dom'
import UsersToShow from './components/userToShow'
import UserIndividuals from './components/IndividiualUser'
import { showNotification } from './reducers/notificationReducer'
import BlogIndividuals from './components/IndividiualBlog'
import BlogToShow from './components/BlogToShow'
import LoginPage from './components/LogInPage'

const NavigationBar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none',
    padding: '10px',
    backgroundColor: '#f3f3f3',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
  };

  return (
    <nav>
      <ul style={navStyle}>
        <li><Link style={linkStyle} to="/">Blogs</Link></li> 
        <li><Link style={linkStyle} to="/users">Users</Link></li>       
      </ul>
    </nav>
  );
};


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const authenUser = useSelector(state => state.authenUser)
  //const [username, setUsername] = useState('')  moved to login page
  //const [password, setPassword] = useState('') moved
  //const [sortedBlogs, setSortedBlogs] = useState([])
  // const [loginVisible, setLoginVisible] = useState(false) aborted
  
  const dispatch = useDispatch()
  //const blogFormRef = useRef()
  useEffect(() => {
    dispatch(initialBlogs())
    dispatch(userInitial())
    dispatch(initialUsersAll())
  }, [dispatch])
  

  /*const addBlogs = (blogObj) => {
    console.log('AuthenUser:', authenUser);
    if (authenUser) {
      console.log('Adding blog:', blogObj);
      dispatch(createBlogs(blogObj));
    } else {
      console.log('Unauthorized action: Add blog');
      dispatch(showNotification('Authentication error'));
    }
  }* moved, it relaps with other function/ 
  
  /*const deleteBlog = async (id) => {
    console.log('AuthenUser:', authenUser);
    if (authenUser) {
      console.log('Deleting blog:', id);
      dispatch(deleteBlogs(id));
    } else {
      console.log('Unauthorized action: Delete blog');
      dispatch(showNotification('Authentication error'));
    }
  }*/
  
  const Blogs = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <BlogToShow />
      </div>
    )
  }
  
  useEffect(() => {
    // Do something after blogs state changes (force re-render)
  }, [blogs])


  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logOut())
 
  }

  /*const sortByLikes = () => {
    return blogs.slice().sort((x, y) => x.likes - y.likes)
  }*/


  /* const updateSortedBlogs = () => {
    const sorting = sortByLikes()
    setSortedBlogs(sorting)
  }*/

  /*useEffect(() => {
    updateSortedBlogs()
  }, [blogs])*/


  return (

    <div className='container'>
      <NavigationBar />
      <div>
      <Notification />
     </div>
      <div>
        {authenUser === null && <LoginPage/>}
        {authenUser !== null && <BlogForm />}
        {authenUser !== null && (
          <div>
            <p>
              <span style={{ color: 'crimson', fontWeight: 'bold' }}>
                {authenUser.name}
              </span> {' '}
                logged in
            </p> 
            <button onClick={handleLogout}>log out</button>
          </div>
        )}
      </div>    
      <div>  
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/users' element={<UsersToShow />} />
          <Route path='/users/:id' element={<UserIndividuals/>}></Route>
          <Route path='/' element={ <Blogs /> }/>
          <Route path='/blogs/:id' element={<BlogIndividuals />}/>       
        </Routes>      
      </div>
    </div>
  )
  
}
export default App