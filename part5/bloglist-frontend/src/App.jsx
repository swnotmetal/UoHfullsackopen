import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
/* eslint-disable react-hooks/exhaustive-deps */


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [sortedBlogs, setSortedBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON =
  window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlogs = (BlogObj) => {
    const exsitingBlog = blogs.find(blog => blog.title === BlogObj.title && BlogObj.author === BlogObj.author )
  
    if (exsitingBlog) {
      setErrorMessage('This blog already exisits')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4444);
    } else {
      blogService
        .create(BlogObj)
        .then (returnedObject => {
          const updatedBlogs = blogs.concat(returnedObject);
          setBlogs(updatedBlogs);
          const updatedSortedBlogs = sortByLikes(updatedBlogs);
          setSortedBlogs(updatedSortedBlogs);
          setBlogMessage(`A new blog "${BlogObj.title}" by "${BlogObj.author}" is added!`);
          setTimeout (() => {
            setBlogMessage(null)
          }, 4444)
        })
    }
  }
  useEffect(() => {
    // Do something after blogs state changes (force re-render)
  }, [blogs])
  const addingLikes = async (likeObject) => {
    try {
      await blogService.updateLikes(likeObject)
      setBlogs(prevBlogs => {
        return prevBlogs.map(blog => {
          if (blog.id === likeObject.id) {
            return { ...blog, likes: likeObject.likes }
          }
          return blog;
        })
      })
    } catch (error) {
      setErrorMessage([
        `Error ${error.response.status}: ${error.response.data.error}`,
      ]);
      setTimeout(() => {
        setErrorMessage([null, null])
      }, 4444)
    }
  }
    
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4444)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser')
    await setUser(null);

  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
 
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
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
  
  return (
    <div>
      <div>
        <h2>Log into application</h2>
        {user === null && loginForm()}
        {user !== null && newBlogForm()} 
        {user !== null && (
          <div>
            <p>
              <span style={{ color: 'crimson', fontWeight: 'bold' }}>
                {user.name}
              </span> {' '}
                logged in
            </p> 
            <button onClick={handleLogout}>log out</button>
          </div>
        )}
      </div>
      <div>
      <Notification message={errorMessage || blogMessage}/>
     </div>
      <h2>blogs</h2>
     
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} addingLikes={addingLikes} deleteBlog={deleteBlog}/> 
      )}
    </div>
  )
  
}
export default App