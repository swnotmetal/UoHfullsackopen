import React from 'react'
import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { createBlogs, deleteBlogs, initialBlogs } from './reducers/blogReducer'
import { useSelector } from 'react-redux'
import { initialUsersAll } from './reducers/userReducer'
import { logIn, logOut, userInitial } from './reducers/authenReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UsersToShow from './components/userToShow'
import UserIndividuals from './components/IndividiualUser'
import { showNotification } from './reducers/notificationReducer'
import BlogIndividuals from './components/IndividiualBlog'
import BlogToShow from './components/BlogToShow'

const NavigationBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Blogs</Link></li> 
        <li><Link to="/users">Users</Link></li>       
      </ul>
    </nav>
  );
};

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const authenUser = useSelector(state => state.authenUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [sortedBlogs, setSortedBlogs] = useState([])
  const [loginVisible, setLoginVisible] = useState(false)
  
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  useEffect(() => {
    dispatch(initialBlogs())
    dispatch(userInitial())
    dispatch(initialUsersAll())
  }, [dispatch])
  

  const addBlogs = (blogObj) => {
    console.log('AuthenUser:', authenUser);
    if (authenUser) {
      console.log('Adding blog:', blogObj);
      dispatch(createBlogs(blogObj));
    } else {
      console.log('Unauthorized action: Add blog');
      dispatch(showNotification('Authentication error'));
    }
  }
  
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


  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logIn(username, password))
    setUsername('')
    setPassword('')
  }

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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none': ''}
    const showWhenVisible = { display: loginVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={ () => setLoginVisible(true)}> log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={ ({ target }) => 
            setUsername(target.value)}
            handlePasswordChange={ ({ target }) => 
            setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}> cancel</button>
        </div>
      </div>
    )
  }
  const newBlogForm = () => (
    <Togglable buttonLabel = 'new blog' ref={blogFormRef}>
    <BlogForm createBlog={addBlogs} />

  </Togglable>
  )
  const padding = {
    padding : 5
  }
  console.log('userdata', authenUser);
  return (

    <div>
      <NavigationBar />
      <div>
      <Notification />
     </div>
      <div>
        <h2>Log into application</h2>
        {authenUser === null && loginForm()}
        {authenUser !== null && newBlogForm()} 
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
          <Route path='/users' element={<UsersToShow />} />
          <Route path='/users/:id' element={<UserIndividuals/>}></Route>
          <Route path='/' element={<Blogs/>}/>
          <Route path='/blogs/:id' element={<BlogIndividuals />}/>       
        </Routes>      
      </div>
    </div>
  )
  
}
export default App