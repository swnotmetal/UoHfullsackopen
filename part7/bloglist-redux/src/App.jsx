import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { castingLikes, createBlogs, deleteBlogs, initialBlogs } from './reducers/blogReducer'
import { useSelector } from 'react-redux'
import { initialUsersAll } from './reducers/userReducer'
import { logIn, logOut, userInitial } from './reducers/authenReducer'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const authenUser = useSelector(state => state.authenUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sortedBlogs, setSortedBlogs] = useState([])
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
  
  const deleteBlog = async (id) => {
    console.log('AuthenUser:', authenUser);
    if (authenUser) {
      console.log('Deleting blog:', id);
      dispatch(deleteBlogs(id));
    } else {
      console.log('Unauthorized action: Delete blog');
      dispatch(showNotification('Authentication error'));
    }
  }
  
  
  
  useEffect(() => {
    // Do something after blogs state changes (force re-render)
  }, [blogs])
  const addingLikes = async (likeObject) => {
    dispatch(castingLikes(likeObject))
  }
    
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

  const sortByLikes = () => {
    return blogs.slice().sort((x, y) => x.likes - y.likes)
  }


  const updateSortedBlogs = () => {
    const sorting = sortByLikes()
    setSortedBlogs(sorting)
  }

  useEffect(() => {
    updateSortedBlogs()
  }, [blogs])

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
  console.log('userdata', authenUser);
  return (
    <div>
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
    
      <h2>blogs</h2>
     
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={authenUser} addingLikes={addingLikes} deleteBlog={deleteBlog}/> 
      )}
    </div>
  )
  
}
export default App